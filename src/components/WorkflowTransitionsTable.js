import { WorkflowTransitionTableRow } from "./WorkflowTransitionTableRow.js"

/**
 * Renders a table of transitions in the workflow.
 *
 * @param {Object} param0 - Props for the WorkflowTransitionsTable component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the workflow.
 * @returns {JSX.Element} - The JSX element representing the WorkflowTransitionsTable component.
 */
export const WorkflowTransitionsTable = ({workflow, actions}) => {
    return (
        <table className="table table-hover table-stripped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Transition name</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {workflow?.transitions?.map(
                    (transition, index) => 
                        <WorkflowTransitionTableRow 
                            key={transition.id} 
                            transition={transition} 
                            index={index + 1} 
                            actions={actions} 
                            wid={workflow.id}
                        />
                )}
            </tbody>
        </table>
    )
}