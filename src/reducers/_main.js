import { WorkflowActions } from "./WorkflowReducers"
import { 
    WorkflowFetch, 
    WorkflowAsyncUpdate, 
    WorkflowStateAsyncUpdate, 
    WorkflowTransitionAsyncUpdate , 
    WorkflowStateAsyncInsert , 
    WorkflowTransitionAsyncInsert
} from "./WorkflowAsyncActions"


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
    
        onWorkflowStateRemove: ({state, workflow}) => dispatch(WorkflowActions.workflow_stateRemove({state, workflow})),
        onWorkflowStateUpdate: (payload) => dispatch(WorkflowActions.workflow_stateUpdate(payload)),
        
        onWorkflowTransitionUpdate: (payload) => dispatch(WorkflowActions.workflow_transitionUpdate(payload)),
    
        workflowFetch: (id) => dispatch(WorkflowFetch(id)),
       
        workflowAsyncUpdate: (workflow) => dispatch(WorkflowAsyncUpdate(workflow)),
        workflowStateAsyncUpdate: (payload) => dispatch(WorkflowStateAsyncUpdate(payload)),
        workflowStateAsyncInsert: (payload) => dispatch(WorkflowStateAsyncInsert(payload)),

        workflowTransitionAsyncUpdate: (workflow) => dispatch(WorkflowTransitionAsyncUpdate(workflow)),
        workflowTransitionAsyncInsert: (workflow) => dispatch(WorkflowTransitionAsyncInsert(workflow))
    }
}