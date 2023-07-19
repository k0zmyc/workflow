import { WorkflowActions } from "./WorkflowReducers" 

import { WorkflowQuerySmall } from "../queries/WorkflowQuerySmall"
import { WorkflowQueryLarge } from "../queries/WorkflowQueryLarge"
import { authorizedFetch } from "../queries/authorizedFetch"


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

export const WorkflowAsyncUpdate = (workflow) => async (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowAsyncUpdateMutationJSON({workflow}))
    }


    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
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
            `mutation($id: ID!, $lastchange: DateTime!, $name: String!, $valid: Boolean!) {
                workflowStateUpdate(state:{
                    id: $id, 
                    lastchange: $lastchange, 
                    name: $name
                    valid: $valid
                }){
                    id
                    msg
                    state{
                        id
                        lastchange
                        name
                        valid
                    }
                }
            }`,
            "variables": {
                "id": state.id,
                "lastchange": state.lastchange,
                "name": state.name,
                "valid": state.valid
            }
    
    }
}

export const WorkflowStateAsyncUpdate = ({state, workflow}) => async (dispatch, getState) => {
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

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                //console.log("WorkflowStateAsyncUpdate data: ", json.data)
                const msg = json.data.workflowStateUpdate.msg
                console.log("WorkflowStateAsyncUpdate: ", msg)
                if (msg === "fail") {
                    console.log("Update WorkflowStateAsyncUpdate selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const lastchange = json.data.workflowStateUpdate.state.lastchange
                    
                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_stateUpdate({workflow, state: {...state, lastchange: lastchange}}))
                    //dispatch(WorkflowActions.workflow_update({...workflow}))  // did not update the page
                    
                }
                return json
            }
        ) 
}

const workflowTransitionAsyncUpdateMutationJSON = ({transition}) => {
    return {
        query: 
            `mutation($id: ID!, $lastchange: DateTime!, $name: String!, $sourcestateId: ID!, $destinationstateId: ID!, $valid: Boolean!){
                workflowTransitionUpdate(state:{
                    lastchange: $lastchange
                    id: $id
                    name: $name
                    sourcestateId: $sourcestateId
                    destinationstateId: $destinationstateId
                    valid: $valid
                }){
                    id
                    msg
                    transition{
                        id
                        lastchange
                        name
                        valid
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
                "destinationstateId": transition.destination.id,
                "valid": transition.valid
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


    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
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


    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
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

export const WorkflowTransitionAsyncInsert = ({transition, workflow}) => async (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowTransitionAsyncInsertMutationJSON({transition, workflow}))
    }

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
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

                    console.log("WorkflowTransitionAsyncInsert transition: ", transition)
                    
                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_transitionUpdate({workflow, transition: {...transition}}))
                    
                }
                return json
            }
        )
    
}

const userAsyncQueryJSON = () => {
    return {
        query: 
            `query {
                userPage {
                    id
                    name
                    surname
                }
            }`,
    }
}

export const UserAsyncQuery = () => async (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(userAsyncQueryJSON())
    }

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                //console.log("UserAsyncQuery data: ", json.data)
                return json
            }
        )
    
}


const workflowStateAsyncAddUserMutationJSON = ({state, user}) => {
    return {
        query: 
            `mutation($workflowstateId: ID!, $userId: ID!, $groupId: ID!, $accesslevel: Int!) {
                workflowStateAddUser(payload: {
                    workflowstateId: $workflowstateId
                    userId: $userId
                    groupId: $groupId
                    accesslevel: $accesslevel
                }){
                    id
                    msg
                    state {
                        id
                        lastchange
                        name
                        users {
                            id
                            lastchange
                            user {
                                name
                                surname
                                id
                            }
                        }
                    }
                }
            }`,
            "variables": {
                "workflowstateId": state.id, 
                "userId": user.id,
                "groupId": "",
                "accesslevel": 10
            }
        
    }
}

export const WorkflowStateAsyncAddUser = ({state, user, workflow}) => async (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowStateAsyncAddUserMutationJSON({state: state, user: user}))
    }

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                console.log("workflowStateAsyncAddUser data: ", json.data)
                const msg = json.data.workflowStateAddUser.msg
                if (msg === "fail") {
                    console.log("Update workflowStateAsyncAddUser selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const state = json.data.workflowStateAddUser.state
                    const lastchange = json.data.workflowStateAddUser.lastchange
                    const payload = {workflow, state: {...state, lastchange: lastchange, users: state.users}}

                    //console.log("WorkflowStateAsyncAddUser payload: ", payload)

                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_stateUpdate(payload))
                    
                }
                return json
            }
        )
    
}


const workflowStateAsyncRemoveUserMutationJSON = ({userId, workflowstateId}) => {
    return {
        query: 
            `mutation($workflowstateId: ID!, $userId: ID!, $groupId: ID!) {
                workflowStateRemoveUser(payload: {
                    workflowstateId: $workflowstateId
                    userId: $userId
                    groupId: $groupId
                }){
                    id
                    msg
                    state {
                        id
                        lastchange
                        name
                        users {
                            user {
                                id
                                name
                                surname
                            }
                        }
                    }
                }
            }`,
            "variables": {
                "workflowstateId": workflowstateId, 
                "userId": userId,
                "groupId": "",
            }
        
    }
}

export const WorkflowStateAsyncRemoveUser = ({workflowstateId, userId, workflow}) => async (dispatch, getState) => {
    console.log("WorkflowStateAsyncRemoveUser payload: ", {workflowstateId, userId, workflow})
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowStateAsyncRemoveUserMutationJSON({userId, workflowstateId}))
    }

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                console.log("WorkflowStateAsyncRemoveUser data: ", json.data)
                const msg = json.data.workflowStateRemoveUser.msg
                if (msg === "fail") {
                    console.log("Remove WorkflowStateAsyncRemoveUser selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const state = json.data.workflowStateRemoveUser.state
                    const lastchange = json.data.workflowStateRemoveUser.lastchange
                    const payload = {workflow, state: {...state, lastchange: lastchange, users: [state.users[0]]}}

                    //console.log("WorkflowStateAsyncAddUser payload: ", payload)

                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_stateUpdate(payload))
                    
                }
                return json
            }
        )
    
}


const roleTypeAsyncQueryJSON = () => {
    return {
        query: 
            `query {
                roleTypePage {
                    id
                    name
                }
            }`,
    }
}

export const RoleTypeAsyncQuery = () => async (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(roleTypeAsyncQueryJSON())
    }

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                //console.log("RoleTypeAsyncQuery data: ", json.data)
                return json
            }
        )
    
}


const workflowStateAsyncAddRoleTypeMutationJSON = ({workflowstateId, roletypeId}) => {
    return {
        query: 
            `mutation($workflowstateId: ID!, $roletypeId: ID!, $accesslevel: Int!) {
                workflowStateAddRole(payload: {
                    workflowstateId: $workflowstateId
                    roletypeId: $roletypeId
                    accesslevel: $accesslevel
                }){
                    id
                    msg
                    state {
                        id
                        lastchange
                        name
                        roletypes {
                            roleType {
                                id
                                name
                            }
                        }
                    }
                }
            }`,
            "variables": {
                "workflowstateId": workflowstateId, 
                "roletypeId": roletypeId,
                "accesslevel": 10
            }
        
    }
}

export const WorkflowStateAsyncAddRoleType = ({state, roleType, workflow}) => async (dispatch, getState) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowStateAsyncAddRoleTypeMutationJSON({workflowstateId: state.id, roletypeId: roleType.id}))
    }

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                //console.log("workflowStateAsyncAddRoleType data: ", json.data)
                const msg = json.data.workflowStateAddRole.msg
                if (msg === "fail") {
                    console.log("Update WorkflowStateAsyncAddRoleType selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const state = json.data.workflowStateAddRole.state
                    const lastchange = json.data.workflowStateAddRole.lastchange
                    const payload = {workflow, state: {...state, lastchange: lastchange, users: [...state.roletypes]}}

                    //console.log("WorkflowStateAsyncAddUser payload: ", payload)

                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_stateUpdate(payload))
                    
                }
                return json
            }
        )
    
}


const workflowStateAsyncRemoveRoleTypeMutationJSON = ({roletypeId, workflowstateId}) => {
    return {
        query: 
            `mutation($workflowstateId: ID!, $roletypeId: ID!) {
                workflowStateRemoveRole(payload: {
                    workflowstateId: $workflowstateId
                    roletypeId: $roletypeId
                }){
                    id
                    msg
                    state {
                        id
                        lastchange
                        name
                        roletypes {
                            roleType {
                                id
                                name
                            }
                        }
                    }
                }
            }`,
            "variables": {
                "workflowstateId": workflowstateId, 
                "roletypeId": roletypeId,
            }
        
    }
}

export const WorkflowStateAsyncRemoveRoleType = ({workflowstateId, roletypeId, workflow}) => async (dispatch, getState) => {
    console.log("WorkflowStateAsyncRemoveUser payload: ", {workflowstateId, roletypeId, workflow})
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(workflowStateAsyncRemoveRoleTypeMutationJSON({roletypeId, workflowstateId}))
    }

    //return fetch('/api/gql', params)
    return authorizedFetch('/api/gql', params)
        .then(
            resp => resp.json()
        )
        .then(
            json => {
                console.log("WorkflowStateAsyncRemoveRoleTypeId data: ", json.data)
                const msg = json.data.workflowStateRemoveRole.msg
                if (msg === "fail") {
                    console.log("Remove WorkflowStateAsyncRemoveUser selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const state = json.data.workflowStateRemoveRole.state
                    const lastchange = json.data.workflowStateRemoveRole.lastchange
                    const payload = {workflow, state: {...state, lastchange: lastchange, users: [state.roletypes[0]]}}

                    //console.log("WorkflowStateAsyncAddUser payload: ", payload)

                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_stateUpdate(payload))
                    
                }
                return json
            }
        )
    
}