import { WorkflowStateTablePopupTransitionRow } from "./WorkflowStateTablePopupTransitionRow.js";
import { WorkflowStateTablePopupAddTransition } from "./WorkflowStateTablePopupAddTransition.js";

/**
 * Renders a table row for a single transition in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupTransition component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {Object} param0.modalState - The state object to display in the modal.
 * @param {Function} param0.addTransitionToState - Callback function to add a transition to the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupTransition component.
 */
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