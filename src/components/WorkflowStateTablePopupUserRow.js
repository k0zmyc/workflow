import { TextInput } from "./TextInput.js";

export const WorkflowStateTablePopupUserRow = ({index, user, actions, wid}) => {
    
    //change state name callback
    const onChangeUserName = (value) => {
        console.log("onChangeUserName: ", value)
        if (actions.onWorkflowStateUpdate) {
        //     console.log("onChangeName: ", state, value)
        //     const payload = {workflow: {id: wid}, state: {...state, name: value}}

        //     //looks like I dont need this because its called in actions.workflowStateAsyncUpdate
        //     //actions.onWorkflowStateUpdate(payload)

        //     actions.workflowStateAsyncUpdate(payload)
        //         .then(json=>console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg))
        }
    }

    //change state name callback
    const onChangeUserSurname = (value) => {
        console.log("onChangeUserSurname: ", value)
        if (actions.onWorkflowStateUpdate) {
        //     console.log("onChangeName: ", state, value)
        //     const payload = {workflow: {id: wid}, state: {...state, name: value}}

        //     //looks like I dont need this because its called in actions.workflowStateAsyncUpdate
        //     //actions.onWorkflowStateUpdate(payload)

        //     actions.workflowStateAsyncUpdate(payload)
        //         .then(json=>console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg))
        }
    }


    return(
        <tr>
            <th>{index}:</th>
            <th>{user.user.id}</th>
            <th><TextInput placeholder={"name"} value={user.user.name} onChange={onChangeUserName}/></th>
            <th><TextInput placeholder={"surname"} value={user.user.surname} onChange={onChangeUserSurname}/></th>
        </tr>
    )
}