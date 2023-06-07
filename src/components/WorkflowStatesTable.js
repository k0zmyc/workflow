import { WorkflowStateTableRow } from "./WorkflowStateTableRow.js"

/**
 * List of members as a table
 * @param {*} param0 
 * @returns 
 */
export const WorkflowStatesTable = ({workflow, actions}) => {
    //console.log("workflol states in workflowStatesTable: ", workflow)
    
    return (
        <table className="table table-hover table-stripped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>State name</th>
                    <th>State transitions</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {workflow?.states?.map(
                    (state, index) => <WorkflowStateTableRow key={state.id} state={state} index={index + 1} actions={actions} wid={workflow.id}/>
                )}
            </tbody>
        </table>
    )
}