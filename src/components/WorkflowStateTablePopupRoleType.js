import { WorkflowStateTablePopupRoleTypeRow } from "./WorkflowStateTablePopupRoletypeRow.js";
import { WorkflowStateTablePopupAddRoleType } from "./WorkflowStateTablePopupAddRoleType.js";

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