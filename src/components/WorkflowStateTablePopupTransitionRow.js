import { TextInput } from "./TextInput.js";

export const WorkflowStateTablePopupTransitionRow = ({index, transition, actions, wid}) => {
    
    //change state name callback
    const onChangeTranstitionName = (value) => {
        console.log("onChangeTransitionName: ", value)
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
            <th>{transition.id}</th>
            <th><TextInput placeholder={"name"} value={transition.name} onChange={onChangeTranstitionName}/></th>
            <th>{transition.destination.name}</th>
        </tr> 
    )
}