import { WorkflowTransitionTableRow } from "./WorkflowTransitionTableRow.js"

/**
 * List of members as a table
 * @param {*} param0 
 * @returns 
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
                        <WorkflowTransitionTableRow key={transition.id} transition={transition} index={index + 1} actions={actions} wid={workflow.id}/>
                )}
            </tbody>
        </table>
    )
}