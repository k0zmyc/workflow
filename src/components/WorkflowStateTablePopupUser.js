import { WorkflowStateTablePopupUserRow } from "./WorkflowStateTablePopupUserRow.js";
import { WorkflowStateTablePopupAddUser } from "./WorkflowStateTablePopupAddUser.js";

/**
 * Renders a table row for a single user in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupUser component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {Object} param0.modalState - The state object to display in the modal.
 * @param {Function} param0.setUsersInState - Callback function to set users in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupUser component.
 */
export const WorkflowStateTablePopupUser = ({workflow, actions, modalState, setUsersInState}) => {
    return(
        <div>
            <h4>Users</h4>
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
                    {modalState?.users?.map((user, index) => (
                        <WorkflowStateTablePopupUserRow 
                            key={user.id}
                            user={user}
                            index={index + 1}
                            actions={actions}
                            wid={workflow.id}
                            stateId={modalState.id}
                            setUsersInState={setUsersInState}
                        />
                    ))}
                </tbody>
            </table>

            <WorkflowStateTablePopupAddUser
                state={modalState} 
                actions={actions} 
                wid={workflow.id} 
                setUsersInState={setUsersInState} 
            />
        </div>
    )
}