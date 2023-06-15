import { Trash } from 'react-bootstrap-icons';

import { TextInput } from './TextInput';
import { DeleteButton } from './DeleteButton';


/**
 * One member as a table row
 * @param {*} param0 
 * @returns 
 */

export const WorkflowTransitionTableRow = ({index, transition, actions, wid}) => {

    //remove button action
    const onclick = () => {
        const payload = {workflow: {id: wid}, transition: transition}
        //console.log("State onclick: ")
        //console.log(state.nextTransitions)
        
        // transition remove
        //actions.onWorkflowStateRemove(payload)
    }

    //change state name callback
    const onChangeTransitionName = (value) => {
        console.log("onChangeTransitionName")
        /*
        if (actions.onWorkflowStateUpdate) {
            console.log("onChangeName: ", transition, value)
            const payload = {workflow: {id: wid}, state: {...transition, name: value}}

            //looks like I dont need this because its called in actions.workflowStateAsyncUpdate
            //actions.onWorkflowStateUpdate(payload)

            actions.workflowStateAsyncUpdate(payload)
                .then(json=>console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg))
        }
        */
    }


    return (
        <tr>
            <td>{index}: </td>
            <td><TextInput placeholder={"transition name"} id={wid} value={transition.name} onChange={onChangeTransitionName}/></td>
            <td>
                <TextInput 
                    key={transition.source.id} 
                    placeholder={"source name"} 
                    id={wid} 
                    value={transition.source.name} 
                    onChange={(value) => onChangeTransitionName(value, transition)}
                />
            </td>
            <td>
                <TextInput 
                    key={transition.destination.id} 
                    placeholder={"destination name"} 
                    id={wid} 
                    value={transition.destination.name} 
                    onChange={(value) => onChangeTransitionName(value, transition)}
                />
            </td>
            <td>
                <DeleteButton onClick={onclick}><Trash /></DeleteButton><br/>
            </td>
        </tr>
    )
}