import { createSlice } from '@reduxjs/toolkit'
import { CreateItem, DeleteItem, ReplaceItem, UpdateItem, SelectItem } from './KeyedReducers';

/**
 * Removes a state from the workflow.
 * @param {Object} state - The current state of the workflows.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after removing the specified state from the workflow.
 */
const WorkflowStateRemove = (state, action) => {
    //console.log('volani stavove funkce, smazat stav: ', action.payload)
    const w = action.payload.workflow
    const s = action.payload.state
    //console.log("s: ", s, "w: ", w)
    const workflow = state[w.id]
    workflow.states = workflow.states.filter(m => m.id !== s.id)
    return state
}

/**
 * Updates a state within the workflow.
 * @param {Object} state - The current state of the workflows.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after updating the specified state in the workflow.
 */
const WorkflowStateUpdate = (state, action) => {
    const oldWorkflow = action.payload.workflow
    const newState = action.payload.state

    const newWorkflow = state[oldWorkflow.id]
    newWorkflow.states = newWorkflow.states.map(state => state.id === newState.id ? {...state, ...newState} : state)
    // state[newWorkflow.id] = {...newWorkflow, states: newWorkflow.states}
    WorkflowActions.workflow_update(newWorkflow)

    //console.log("WorkflowStateUpdate: ", state[newWorkflow.id].states)
    return state
}

/**
 * Updates a transition within the workflow.
 * @param {Object} state - The current state of the workflows.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after updating the specified transition in the workflow.
 */
const WorkflowTransitionUpdate = (state, action) => {
    //console.log("WorkflowTransitionUpdate state, action", state, action)

    const w = action.payload.workflow
    const t = action.payload.transition
    const workflow = state[w.id]
    workflow.transitions = workflow.transitions.map(transition => transition.id === t.id ? {...transition, ...t} : transition)
    return state
}



/**
 * Kompletni rez budocim store.
 * Obsluhuje skupiny
 */
export const WorkflowSlice = createSlice({
    name: 'workflows',
    initialState: {},
    reducers: {
        workflow_add: CreateItem,
        workflow_delete: DeleteItem,
        workflow_replace: ReplaceItem,
        workflow_update: UpdateItem,
        workflow_select: SelectItem,

        workflow_stateUpdate: WorkflowStateUpdate,
        workflow_stateRemove: WorkflowStateRemove,

        workflow_transitionUpdate: WorkflowTransitionUpdate
    }
})

//z rezu odvozene akce
export const WorkflowActions = WorkflowSlice.actions
//z rezu odvozeny stavovy automat
export const WorkflowReducer = WorkflowSlice.reducer