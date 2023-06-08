import { WorkflowActions } from "./WorkflowReducers" 

import { WorkflowQuerySmall } from "../queries/WorkflowQuerySmall"
import { WorkflowQueryLarge } from "../queries/WorkflowQueryLarge"

/**
 * Ask for the item on server and adds it or update it in the store to the heap
 * @param {*} id 
 * @returns promise
 */
export const WorkflowFetchHelper = (id, query, resultselector, dispatch, getState) => {
    const log = (text) => (p) => {
        console.log(text)
        console.log(JSON.stringify(p))
        return p
    }
    const p = query(id)
        .then(
            response => response.json(),
            error => error
        )
        .then(
            j => log('incomming')(j)
        )
        .then(
            json => log('converted')(resultselector(json)),
            error => error
        )
        .then(
            json => log('dispatching')(dispatch(WorkflowActions.workflow_update(json))),
            error => error
        )

    return p
}

/**
 * Fetch the group from server checks its type and asks once more for detailed data. Finally puts the result in the store.
 * @param {*} id 
 * @returns 
 */
export const WorkflowFetch = (id) => (dispatch, getState) => {
    const workflowSelector = (json) => json.data.workflowById
    const bodyfunc = async () => {
        // changed WorkflowQuerySmall to WorkflowQueryLarge
        let workflowData = await WorkflowFetchHelper(id, WorkflowQueryLarge, workflowSelector, dispatch, getState)
        
        // dont know what this does
        if (workflowData.type !== "cd49e152-610c-11ed-9f29-001a7dda7110") {
            workflowData = await WorkflowFetchHelper(id, WorkflowQueryLarge, workflowSelector, dispatch, getState)
        }

        return workflowData
    }
    return bodyfunc()
}

/**
 * Fetch the group from server checks its type and asks once more for detailed data. Finally puts the result in the store.
 * @param {*} id 
 * @returns 
 */

// dont think I need this for workflow
/*
export const WorkflowFakeFetch = (id) => (dispatch, getState) => {
    //console.log('GroupFakeFetch')
    const groupSelector = (json) => json.groupById
    const bodyfunc = async () => {
        let groupData = await WorkflowFetchHelper(id, fakeQueryGroup, groupSelector, dispatch, getState)
        dispatch(WorkflowActions.group_select(groupData))
        return groupData
    }
    return bodyfunc()
}
*/

export const WorkflowAsyncUpdate = (workflow) => (dispatch, getState) => {
    const workflowMutationJSON = (workflow) => {
        return {
            query: 
                `mutation{
                    workflowUpdate(workflow:{lastchange: "${workflow.lastchange}", id: "${workflow.id}", name: "${workflow.name}"}){
                        id
                        msg
                        workflow{
                            id
                            lastchange
                            name
                        }
                    }
                }`,
            }
        }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowMutationJSON(workflow))
    }


    return fetch('/api/gql', params)
    //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                console.log(json.data)
                const msg = json.data.workflowUpdate.msg
                if (msg === "fail") {
                    console.log("Update selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const lastchange = json.data.workflowUpdate.workflow.lastchange
                    dispatch(WorkflowActions.workflow_update({...workflow, lastchange: lastchange}))
                }
                return json
            }
        ) 
          
}



export const WorkflowStateAsyncUpdate = ({state, workflow}) => (dispatch, getState) => {
    console.log("WorkflowStateAsyncUpdate state: ", state)
    const workflowStateMutationJSON = (state) => {
        return {
            query: 
                `mutation{
                    workflowStateUpdate(state:{lastchange: "${state.lastchange}", id: "${state.id}", name: "${state.name}"}){
                        id
                        msg
                        state{
                            id
                            lastchange
                            name
                        }
                    }
                }`,
            }
        }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowStateMutationJSON(state))
    }


    return fetch('/api/gql', params)
    //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                console.log("WorkflowStateAsyncUpdate data: ", json.data)
                const msg = json.data.workflowStateUpdate.msg
                if (msg === "fail") {
                    console.log("Update WorkflowStateAsyncUpdate selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const lastchange = json.data.workflowStateUpdate.state.lastchange
                    
                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_stateUpdate({workflow, state: {...state, lastchange: lastchange}}))
                    
                }
                return json
            }
        ) 
          
}

