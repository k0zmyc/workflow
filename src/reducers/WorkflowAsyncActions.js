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
        //console.log(text)
        //console.log(JSON.stringify(p))
        return p
    }
    const p = query(id)
        .then(
            response => response.json(),
            error => error
        )
        .then(
            //j => log('incomming')(j)
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
        
    
        // dont know what this does - ID from DEMO
        // if (workflowData.type !== "cd49e152-610c-11ed-9f29-001a7dda7110") {
        //     workflowData = await WorkflowFetchHelper(id, WorkflowQueryLarge, workflowSelector, dispatch, getState)
        // }

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


const workflowAsyncUpdateMutationJSON = ({workflow}) => {
    return {
        query: 
            `mutation ($id: ID!, $lastchange: DateTime!, $name: String!){
                workflowUpdate(workflow:{id: $id, lastchange: $lastchange, name: $name}){
                    id
                    msg
                    workflow{
                        id
                        lastchange
                        name
                    }
                }
            }`,
            "variables": {
                "id": workflow.id,
                "lastchange": workflow.lastchange,
                "name": workflow.name
            }
            
    }
}

export const WorkflowAsyncUpdate = (workflow) => (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowAsyncUpdateMutationJSON({workflow}))
    }


    return fetch('/api/gql', params)
    //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                //console.log(json.data)
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


const workflowStateAsyncUpdateMutationJSON = ({state}) => {
    return {
        query: 
            `mutation($id: ID!, $lastchange: DateTime!, $name: String!) {
                workflowStateUpdate(state:{id: $id, lastchange: $lastchange, name: $name}){
                    id
                    msg
                    state{
                        id
                        lastchange
                        name
                    }
                }
            }`,
            "variables": {
                "id": state.id,
                "lastchange": state.lastchange,
                "name": state.name
            }
    
    }
}

export const WorkflowStateAsyncUpdate = ({state, workflow}) => (dispatch, getState) => {
    //console.log("WorkflowStateAsyncUpdate state: ", state)
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowStateAsyncUpdateMutationJSON({state}))
    }

    return fetch('/api/gql', params)
    //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                //console.log("WorkflowStateAsyncUpdate data: ", json.data)
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

const workflowTransitionAsyncUpdateMutationJSON = ({transition}) => {
    return {
        query: 
            `mutation($id: ID!, $lastchange: DateTime!, $name: String!, $sourcestateId: ID!, $destinationstateId: ID!){
                workflowTransitionUpdate(state:{
                    lastchange: $lastchange
                    id: $id
                    name: $name
                    sourcestateId: $sourcestateId
                    destinationstateId: $destinationstateId
                }){
                    id
                    msg
                    transition{
                        id
                        lastchange
                        name
                        source{
                            id
                            name
                            lastchange
                        }
                        destination{
                            id
                            name
                            lastchange
                        }
                    }
                }
            }`,
            "variables": {
                "lastchange": transition.lastchange, 
                "id": transition.id, 
                "name": transition.name,
                "sourcestateId": transition.source.id,
                "destinationstateId": transition.destination.id
            }
            
    }
}

export const WorkflowTransitionAsyncUpdate = ({transition, workflow}) => (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowTransitionAsyncUpdateMutationJSON({transition}))
    }


    return fetch('/api/gql', params)
    //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                console.log("WorkflowTransitionAsyncUpdate data: ", json.data)
                const msg = json.data.workflowTransitionUpdate.msg
                if (msg === "fail") {
                    console.log("Update WorkflowTransitionAsyncUpdate selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const lastchange = json.data.workflowTransitionUpdate.transition.lastchange
                    
                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_transitionUpdate({workflow, transition: {...transition, lastchange: lastchange}}))
                    
                }
                return json
            }
        )

}

/*
    state{
        workflow{
            states{
                id
                lastchange
                name
            }
        }
    }
    pomoci update_item to updatovat
*/


const workflowStateAsyncInsertMutationJSON = ({state, workflow}) => {
    return {
        query: 
            `mutation($workflowId: ID!, $name: String!){
                workflowStateInsert(state:{workflowId: $workflowId, name: $name}){
                    id
                    msg
                    state{
                        id
                        lastchange
                        name
                    }
                }
            }`,
            "variables": {
                "workflowId": workflow.id, 
                "name": state.name
            }

    }
}

export const WorkflowStateAsyncInsert = ({state, workflow}) => (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowStateAsyncInsertMutationJSON({state, workflow}))
    }


    return fetch('/api/gql', params)
    //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                //console.log("WorkflowStateAsyncUpdate data: ", json.data)
                const msg = json.data.workflowStateInsert.msg
                if (msg === "fail") {
                    console.log("Update WorkflowStateAsyncInsert selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const state = json.data.workflowStateInsert.state
                    
                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_stateUpdate({workflow, state: {...state}}))
                }
                return json
            }
        )
    
}

const workflowTransitionAsyncInsertMutationJSON = ({transition, workflow}) => {
    return {
        query: 
            `mutation($workflowId: ID!, $name: String!, $sourcestateId: ID!, $destinationstateId: ID!) {
                workflowTransitionInsert(state:{
                    workflowId: $workflowId
                    name: $name
                    sourcestateId: $sourcestateId
                    destinationstateId: $destinationstateId
                }){
                    id
                    msg
                    transition{
                      id
                      lastchange
                      name
                      source{
                        id
                        name
                      }
                      destination{
                        id
                        name
                      }
                    }
                }
            }`,
            "variables": {
                "workflowId": workflow.id, 
                "name": transition.name,
                "sourcestateId": transition.source.id,
                "destinationstateId": transition.destination.id
            }
        
    }
}

export const WorkflowTransitionAsyncInsert = ({transition, workflow}) => (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowTransitionAsyncInsertMutationJSON({transition, workflow}))
    }

    return fetch('/api/gql', params)
    //return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                console.log("WorkflowTransitionAsyncInsert data: ", json.data)
                const msg = json.data.workflowTransitionInsert.msg
                if (msg === "fail") {
                    console.log("Update WorkflowTransitionAsyncInsert selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const transition = json.data.workflowTransitionInsert.transition
                    
                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_transitionUpdate({workflow, transition: {...transition}}))
                    
                }
                return json
            }
        )
    
}
