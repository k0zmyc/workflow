import { WorkflowStateTablePopupRoleTypeRow } from "./WorkflowStateTablePopupRoletypeRow.js";
import { WorkflowStateTablePopupAddRoleType } from "./WorkflowStateTablePopupAddRoleType.js";

/**
 * Renders a table with role types in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupRoleType component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {Object} param0.modalState - The state object to display in the modal.
 * @param {Function} param0.setRoleTypesInState - Callback function to set role types in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupRoleType component.
 */
export const WorkflowStateTablePopupRoleType = ({workflow, actions, modalState, setRoleTypesInState}) => {
    return(
        <div>
            <h4>Role types</h4>
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
                    {modalState?.roletypes?.map((roleType, index) => (
                        <WorkflowStateTablePopupRoleTypeRow
                            key={roleType.id}
                            roleType={roleType}
                            index={index + 1}
                            actions={actions}
                            wid={workflow.id}
                            stateId={modalState.id}
                            setRoleTypesInState={setRoleTypesInState}
                        />
                    ))}
                </tbody>
            </table>

            <WorkflowStateTablePopupAddRoleType 
                state={modalState} 
                actions={actions} 
                wid={workflow.id} 
                setRoleTypesInState={setRoleTypesInState} 
            />
        </div>
    )
}