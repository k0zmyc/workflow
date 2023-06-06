import { createSlice } from '@reduxjs/toolkit'
import { CreateItem, DeleteItem, ReplaceItem, UpdateItem, SelectItem } from './KeyedReducers';

/**
 * stavova funkce, ktera odebere uzivatele ze skupiny 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */


// more like WorkflowStateRemove & WorkflowTransitionRemove
const WorkflowMemberRemove = (state, action) => {
    console.log('volani stavove funkce, smazat uzivatele')
    const w = action.payload.workflow
    const u = action.payload.user
    console.log(u)
    const group = state[w.id]
    group.memberships = group.memberships.filter(m => m.user.id !== u.id)
    return state
}

/**
 * Stavova funkce, ktera provede update uzivatele ve skupine
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */

// more like WorkflowStateUpdate & WorkflowTransitionUpdate
const WorkflowMemberUpdate = (state, action) => {
    const g = action.payload.group
    const u = action.payload.user
    const group = state[g.id]
    group.memberships = group.memberships.map(user => user.id === u.id ? {...user, ...u} : user)
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

        workflow_memberRemove: WorkflowMemberRemove,
        workflow_memberUpdate: WorkflowMemberUpdate
    }
})

//z rezu odvozene akce
export const WorkflowActions = WorkflowSlice.actions
//z rezu odvozeny stavovy automat
export const WorkflowReducer = WorkflowSlice.reducer