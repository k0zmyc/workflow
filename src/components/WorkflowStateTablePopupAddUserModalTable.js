import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { WorkflowStateTablePopupAddUserModalTableRow } from './WorkflowStateTablePopupAddUserModalTableRow';

/**
 * Renders a table for adding users in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupAddUserModalTable component.
 * @param {Object} param0.state - The state object containing information about the workflow state.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {string} param0.wid - The ID of the workflow.
 * @param {boolean} param0.isOpen - Boolean indicating whether the modal is open or not.
 * @param {Function} param0.closeModal - Callback function to close the modal.
 * @param {Function} param0.setUsersInState - Callback function to set users in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupAddUserModalTable component.
 */
export const WorkflowStateTablePopupAddUserModalTable = ({state, actions, wid, isOpen, closeModal, setUsersInState }) => {

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
                            setUsersInState={setUsersInState}
                        />
                    ))}
                </tbody>
            </table>

            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </ReactModal>
    );
};