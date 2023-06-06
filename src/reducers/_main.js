import { WorkflowActions } from "./WorkflowReducers"
import { WorkflowFetch, WorkflowAsyncUpdate } from "./WorkflowAsyncActions"


/**
 * vytvori actions, ktere pri volani uz vse radne provedou
 * jsou zahrnuty i "asynchronni" akce
 * @param {*} dispatch 
 * @returns 
 */
export const bindWorkflowActions = (dispatch) => {
    return {
        onWorkflowUpdate: (g) => dispatch(WorkflowActions.workflow_update(g)),
        onWorkflowAdd: (g) => dispatch(WorkflowActions.workflow_add(g)),
    
        onWorkflowMemberRemove: ({user, workflow}) => dispatch(WorkflowActions.workflow_memberRemove({user, workflow})),
        onWorkflowMemberUpdate: (payload) => dispatch(WorkflowActions.workflow_memberUpdate(payload)),
    
        workflowFetch: (id) => dispatch(WorkflowFetch(id)),
       
        workflowAsyncUpdate: (workflow) => dispatch(WorkflowAsyncUpdate(workflow))
    }
}