import { createSlice } from '@reduxjs/toolkit'
import { CreateItem, DeleteItem, ReplaceItem, UpdateItem, SelectItem } from './KeyedReducers';

/**
 * stavova funkce, ktera odebere stav z workflow 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */


// more like WorkflowStateRemove & WorkflowTransitionRemove
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
 * Stavova funkce, ktera provede update stavu v workflow
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */

// more like WorkflowStateUpdate & WorkflowTransitionUpdate
const WorkflowStateUpdate = (state, action) => {
    const w = action.payload.workflow
    const s = action.payload.state
    const workflow = state[w.id]
    workflow.states = workflow.states.map(state => state.id === s.id ? {...state, ...s} : state)
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

        workflow_stateRemove: WorkflowStateRemove,
        workflow_stateUpdate: WorkflowStateUpdate
    }
})

//z rezu odvozene akce
export const WorkflowActions = WorkflowSlice.actions
//z rezu odvozeny stavovy automat
export const WorkflowReducer = WorkflowSlice.reducer