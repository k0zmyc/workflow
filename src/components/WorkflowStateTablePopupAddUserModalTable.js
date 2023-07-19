import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { WorkflowStateTablePopupAddUserModalTableRow } from './WorkflowStateTablePopupAddUserModalTableRow';

export const WorkflowStateTablePopupAddUserModalTable = ({state, actions, wid, isOpen, closeModal, addUsersToState }) => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        actions.userAsyncQuery()
            .then(json => setUsers(json.data.userPage));
    }, [actions]);


    return (
        <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>Add User</h2>

            <table className="table table-hover table-stripped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <WorkflowStateTablePopupAddUserModalTableRow
                            key={user.id}
                            user={user}
                            state={state}
                            index={index + 1}
                            actions={actions}
                            wid={wid}
                            closeModal={closeModal}
                            addUsersToState={addUsersToState}
                        />
                    ))}
                </tbody>
            </table>

            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </ReactModal>
    );
};