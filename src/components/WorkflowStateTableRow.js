import { Trash } from 'react-bootstrap-icons';

import { TextInput } from './TextInput';
import { DeleteButton } from './DeleteButton';


//import { WorkflowStateRemoveButton } from './WorkflowStateRemoveButton';

/**
 * One member as a table row
 * @param {*} param0 
 * @returns 
 */

export const WorkflowStateTableRow = ({index, state, actions, wid}) => {
    //console.log("WorkflowStateTableRow log: ")
    //console.log("index: ", index,"name: ", name, "nextTransitions: ", nextTransitions, "actions: ", actions, "gid: ", wid)

    //remove button action
    const onclick = () => {
        const payload = {workflow: {id: wid}, state: state}
        //console.log("State onclick: ")
        //console.log(state.nextTransitions)
        actions.onWorkflowStateRemove(payload)
    }

    //change state name callback
    const onChangeStateName = (value) => {
        if (actions.onWorkflowStateUpdate) {
            console.log("onChangeName: ", state, value)
            const payload = {workflow: {id: wid}, state: {...state, name: value}}
            actions.onWorkflowStateUpdate(payload)

            actions.workflowStateAsyncUpdate(payload)
                .then(json=>console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg))
        }
    }

    /*
    ********************** replace with change transitions, etc... **************


    const onChangeSurname = (value) => {
        //console.log("onChangeEmail")
        //console.log(user, value)
        if (actions.onGroupMemberUpdate) {
            const payload = {group: {id: gid}, user: {...name, surname: value}}
            actions.onGroupMemberUpdate(payload)
        }
    }

    const onChangeName = (value) => {
        //console.log("onChangeEmail")
        
        if (actions.onGroupMemberUpdate) {
            console.log(name, value)
            const payload = {group: {id: gid}, user: {...name, name: value}}
            actions.onGroupMemberUpdate(payload)
        }
    }
    */

    return (
        <tr>
            <td>{index}: </td>
            <td><TextInput placeholder={"name"} id={wid} value={state.name} onChange={onChangeStateName}/></td>
            <td>
                {state.nextTransitions.map((transition) => (
                    <TextInput key={transition.id} placeholder={"transition"} id={wid} value={transition.name} onChange={onChangeStateName}/>
                ))}
            </td>
            <td>
                <DeleteButton onClick={onclick}><Trash /> state</DeleteButton><br/>
                {/* <WorkflowStateRemoveButton group={{id: gid}} user={name} actions={actions} /> */}
            </td>
            
        </tr>
    )
}