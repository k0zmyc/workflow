import { TextInput } from "./TextInput.js";

export const WorkflowStateTablePopupRoletypeRow = ({index, roleType, actions, wid}) => {
    
    //change state name callback
    const onChangeRoleTypeName = (value) => {
        console.log("onChangeRoleTypeName: ", value)
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
            <th>{index}</th>
            <th>{roleType.id}</th>
            <th>{roleType.roleType.name}</th>
            {/* <th><TextInput placeholder={"name"} value={roleType.roleType.name} onChange={onChangeRoleTypeName}/></th> */}
        </tr> 
    )
}