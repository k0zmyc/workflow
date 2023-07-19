import { WorkflowActions } from "./WorkflowReducers" 
import { WorkflowQuerySmall } from "../queries/WorkflowQuerySmall"
import { WorkflowQueryLarge } from "../queries/WorkflowQueryLarge"
import { authorizedFetch } from "../queries/authorizedFetch"


/**
 * Helper function to fetch workflow data from the server and update it in the store.
 * @param {string} id - The ID of the item to fetch from the server.
 * @param {Function} query - The function to fetch the item from the server.
 * @param {Function} resultselector - The function to process the fetched JSON data.
 * @param {Function} dispatch - The Redux dispatch function to update the store.
 * @param {Function} getState - The Redux getState function to get the current store state.
 * @returns {Promise} - A promise that resolves when the workflow data is fetched and updated.
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
 * Fetches the workflow data from the server, checks its type, and fetches detailed data if necessary. Then, it puts the result in the store.
 * @param {string} id - The ID of the workflow to fetch from the server.
 * @returns {Function} - A Redux thunk function that handles the workflow fetch.
 */
export const WorkflowFetch = (id) => (dispatch, getState) => {
    const workflowSelector = (json) => json.data.workflowById
    const bodyfunc = async () => {
        // changed WorkflowQuerySmall to WorkflowQueryLarge
        let workflowData = await WorkflowFetchHelper(id, WorkflowQueryLarge, workflowSelector, dispatch, getState)
        
    
        // dont know what this does - ID from DEMO - dont think I need this
        // if (workflowData.type !== "cd49e152-610c-11ed-9f29-001a7dda7110") {
        //     workflowData = await WorkflowFetchHelper(id, WorkflowQueryLarge, workflowSelector, dispatch, getState)
        // }

        return workflowData
    }
    return bodyfunc()
}


/**
 * Creates a JSON object for updating the workflow data on the server.
 * @param {Object} workflow - The workflow data to update on the server.
 * @returns {Object} - A JSON object representing the update mutation.
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


/**
 * Asynchronously updates the workflow data on the server.
 * @param {Object} workflow - The workflow data to update on the server.
 * @returns {Promise} - A promise that resolves when the update is complete.
 */
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


/**
 * Creates a JSON object for updating the workflow state on the server.
 * @param {Object} state - The workflow state data to update on the server.
 * @returns {Object} - A JSON object representing the state update mutation.
 */
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


/**
 * Asynchronously updates the workflow state on the server.
 * @param {Object} state - The workflow state data to update on the server.
 * @param {Object} workflow - The workflow containing the state to update.
 * @returns {Promise} - A promise that resolves when the state update is complete.
 */
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

/**
 * Generates a GraphQL mutation JSON object for updating a workflow transition.
 *
 * @param {object} params - The parameters for the mutation.
 * @param {object} params.transition - The transition object to be updated.
 * @returns {object} The GraphQL mutation JSON object.
 */
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

/**
 * Updates a workflow transition asynchronously.
 *
 * @param {object} params - The parameters for the update function.
 * @param {object} params.transition - The transition object to be updated.
 * @param {object} params.workflow - The workflow object to which the transition belongs.
 * @returns {Promise} A Promise that resolves to the JSON response of the update operation.
 */
export const WorkflowTransitionAsyncUpdate = ({transition, workflow}) => async (dispatch, getState) => {
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
                //console.log("WorkflowTransitionAsyncUpdate data: ", json.data)
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

/**
 * Generates a GraphQL mutation JSON object for inserting a new workflow state.
 *
 * @param {object} params - The parameters for the mutation.
 * @param {object} params.state - The state object to be inserted.
 * @param {object} params.workflow - The workflow object to which the state belongs.
 * @returns {object} The GraphQL mutation JSON object.
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

/**
 * Inserts a new workflow state asynchronously.
 *
 * @param {object} params - The parameters for the insert function.
 * @param {object} params.state - The state object to be inserted.
 * @param {object} params.workflow - The workflow object to which the state belongs.
 * @returns {Promise} A Promise that resolves to the JSON response of the insert operation.
 */
export const WorkflowStateAsyncInsert = ({state, workflow}) => async (dispatch, getState) => {
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

/**
 * Generates a GraphQL mutation JSON object for inserting a new workflow transition.
 *
 * @param {object} params - The parameters for the mutation.
 * @param {object} params.transition - The transition object to be inserted.
 * @param {object} params.workflow - The workflow object to which the transition belongs.
 * @returns {object} The GraphQL mutation JSON object.
 */
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

/**
 * Inserts a new workflow transition asynchronously.
 *
 * @param {object} params - The parameters for the insert function.
 * @param {object} params.transition - The transition object to be inserted.
 * @param {object} params.workflow - The workflow object to which the transition belongs.
 * @returns {Promise} A Promise that resolves to the JSON response of the insert operation.
 */
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
                //console.log("WorkflowTransitionAsyncInsert data: ", json.data)
                const msg = json.data.workflowTransitionInsert.msg
                if (msg === "fail") {
                    console.log("Update WorkflowTransitionAsyncInsert selhalo")
                } else {
                    //mame hlasku, ze ok, musime si prebrat token (lastchange) a pouzit jej pro priste
                    const transition = json.data.workflowTransitionInsert.transition

                    //console.log("WorkflowTransitionAsyncInsert transition: ", transition)
                    
                    // update lastchange pro budouci upravy
                    dispatch(WorkflowActions.workflow_transitionUpdate({workflow, transition: {...transition}}))
                    
                }
                return json
            }
        )
    
}

/**
 * Generates a GraphQL query JSON object to fetch user data.
 *
 * @returns {object} The GraphQL query JSON object.
 */
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

/**
 * Fetches user data asynchronously.
 *
 * @returns {Promise} A Promise that resolves to the JSON response containing user data.
 */
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


/**
 * Generates a GraphQL mutation JSON object for adding a user to a workflow state.
 *
 * @param {object} params - The parameters for the mutation.
 * @param {object} params.state - The state object to which the user will be added.
 * @param {object} params.user - The user object to be added.
 * @returns {object} The GraphQL mutation JSON object.
 */
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

/**
 * Adds a user to a workflow state asynchronously.
 *
 * @param {object} params - The parameters for the add user function.
 * @param {object} params.state - The state object to which the user will be added.
 * @param {object} params.user - The user object to be added.
 * @param {object} params.workflow - The workflow object to which the state belongs.
 * @returns {Promise} A Promise that resolves to the JSON response of the add user operation.
 */
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
                //console.log("workflowStateAsyncAddUser data: ", json.data)
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


/**
 * Generates a GraphQL mutation JSON object for removing a user from a workflow state.
 *
 * @param {object} params - The parameters for the mutation.
 * @param {string} params.userId - The ID of the user to be removed.
 * @param {string} params.workflowstateId - The ID of the state from which the user will be removed.
 * @returns {object} The GraphQL mutation JSON object.
 */
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
                            id
                            lastchange
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

/**
 * Removes a user from a workflow state asynchronously.
 *
 * @param {object} params - The parameters for the remove user function.
 * @param {string} params.workflowstateId - The ID of the state from which the user will be removed.
 * @param {string} params.userId - The ID of the user to be removed.
 * @param {object} params.workflow - The workflow object to which the state belongs.
 * @returns {Promise} A Promise that resolves to the JSON response of the remove user operation.
 */
export const WorkflowStateAsyncRemoveUser = ({workflowstateId, userId, workflow}) => async (dispatch, getState) => {
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


/**
 * Generates a GraphQL query JSON object for fetching role types.
 *
 * @returns {object} The GraphQL query JSON object.
 */
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

/**
 * Fetches role types asynchronously.
 *
 * @returns {Promise} A Promise that resolves to the JSON response of the role types query.
 */
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


/**
 * Generates a GraphQL mutation JSON object for adding a role type to a workflow state.
 *
 * @param {object} params - The parameters for the mutation.
 * @param {string} params.workflowstateId - The ID of the state to which the role type will be added.
 * @param {string} params.roletypeId - The ID of the role type to be added.
 * @returns {object} The GraphQL mutation JSON object.
 */
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
                            id
                            lastchange
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

/**
 * Adds a role type to a workflow state asynchronously.
 *
 * @param {object} params - The parameters for the add role type function.
 * @param {string} params.workflowstateId - The ID of the state to which the role type will be added.
 * @param {object} params.roleType - The role type object to be added.
 * @param {object} params.workflow - The workflow object to which the state belongs.
 * @returns {Promise} A Promise that resolves to the JSON response of the add role type operation.
 */
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


/**
 * Generates a GraphQL mutation JSON object for removing a role type from a workflow state.
 *
 * @param {object} params - The parameters for the mutation.
 * @param {string} params.roletypeId - The ID of the role type to be removed.
 * @param {string} params.workflowstateId - The ID of the state from which the role type will be removed.
 * @returns {object} The GraphQL mutation JSON object.
 */
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
                            id
                            lastchange
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

/**
 * Removes a role type from a workflow state asynchronously.
 *
 * @param {object} params - The parameters for the remove role type function.
 * @param {string} params.workflowstateId - The ID of the state from which the role type will be removed.
 * @param {string} params.roletypeId - The ID of the role type to be removed.
 * @param {object} params.workflow - The workflow object to which the state belongs.
 * @returns {Promise} A Promise that resolves to the JSON response of the remove role type operation.
 */
export const WorkflowStateAsyncRemoveRoleType = ({workflowstateId, roletypeId, workflow}) => async (dispatch, getState) => {
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
                //console.log("WorkflowStateAsyncRemoveRoleTypeId data: ", json.data)
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