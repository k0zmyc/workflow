import { WorkflowStateTablePopupTransitionRow } from "./WorkflowStateTablePopupTransitionRow.js";
import { WorkflowStateTablePopupAddTransition } from "./WorkflowStateTablePopupAddTransition.js";

export const WorkflowStateTablePopupTransition = ({workflow, actions, modalState, addTransitionToState}) => {
    return(
        <div>
            <h2>State data: {modalState?.name}</h2>
            <h4>Transitions</h4>
            <table className="table table-hover table-stripped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Destination</th>
                    </tr>
                </thead>
                <tbody>
                    {modalState?.nextTransitions?.map((transition, index) => (
                        <WorkflowStateTablePopupTransitionRow 
                            key={transition.id}
                            transition={transition}
                            index={index + 1}
                            actions={actions}
                            wid={workflow.id}
                        />
                    ))}
                </tbody>
            </table>

            <WorkflowStateTablePopupAddTransition 
                state={modalState} 
                actions={actions} 
                wid={workflow.id} 
                addTransitionToState={addTransitionToState} 
            />
        </div>
    )
}