import { WorkflowStateTablePopupUserRow } from "./WorkflowStateTablePopupUserRow.js";
import { WorkflowStateTablePopupAddUser } from "./WorkflowStateTablePopupAddUser.js";

export const WorkflowStateTablePopupUser = ({workflow, actions, modalState, setUsersInState}) =>{

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