import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { WorkflowStateTablePopupAddRoleTypeModalTableRow } from './WorkflowStateTablePopupAddRoleTypeModalTableRow';

/**
 * Renders a modal table for adding role types to a state.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupAddRoleTypeModalTable component.
 * @param {Object} param0.state - The state object containing information about the state.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {string} param0.wid - The ID of the workflow.
 * @param {boolean} param0.isOpen - Indicates whether the modal is open or not.
 * @param {Function} param0.closeModal - Callback function to close the modal.
 * @param {Function} param0.setRoleTypesInState - Callback function to set role types in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupAddRoleTypeModalTable component.
 */
export const WorkflowStateTablePopupAddRoleTypeModalTable = ({state, actions, wid, isOpen, closeModal, setRoleTypesInState}) => {

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
                            setRoleTypesInState={setRoleTypesInState}
                        />
                    ))}
                </tbody>
            </table>

            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </ReactModal>
    );
};