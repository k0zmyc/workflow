import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { WorkflowStateTablePopupAddRoleTypeModalTableRow } from './WorkflowStateTablePopupAddRoleTypeModalTableRow';

export const WorkflowStateTablePopupAddRoleTypeModalTable = ({state, actions, wid, isOpen, closeModal }) => {

    const [roleTypes, setRoleTypes] = useState(null);

    useEffect(() => {
        actions.roleTypeAsyncQuery()
            .then(json => setRoleTypes(json.data.roleTypePage));
    }, [actions]);


    return (
        <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>Add Role Type</h2>

            <table className="table table-hover table-stripped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {roleTypes?.map((roleType, index) => (
                        <WorkflowStateTablePopupAddRoleTypeModalTableRow 
                            key={roleType.id} 
                            roleType={roleType} 
                            state={state}
                            index={index + 1} 
                            actions={actions} 
                            wid={wid}
                            closeModal={closeModal}
                        />
                    ))}
                </tbody>
            </table>

            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </ReactModal>
    );
};