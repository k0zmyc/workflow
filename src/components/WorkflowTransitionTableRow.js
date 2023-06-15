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
    const onDeleteButtonClick = () => {
        const payload = {workflow: {id: wid}, transition: transition}
        console.log("State onclick: ", payload)
        //console.log(state.nextTransitions)
        
        // transition remove
        //actions.onWorkflowStateRemove(payload)
    }

    //change state name callback
    const onChangeTransitionName = (value) => {
        //console.log("onChangeTransitionName: ", value)
        if (actions.onWorkflowTransitionUpdate) {
            const payload = {workflow: {id: wid}, transition: {...transition, name: value}}
            //console.log("onChangeTransitionName: ", payload)

            //looks like I dont need this because its called in actions.workflowStateAsyncUpdate
            //actions.onWorkflowStateUpdate(payload)

            actions.workflowTransitionAsyncUpdate(payload)
                .then(json=>console.log("WorkflowTransitionNameInput: ", json.data.workflowTransitionUpdate.msg))
        }
        
    }


    return (
        <tr>
            <td>{index}: </td>
            <td><TextInput placeholder={"transition name"} id={wid} value={transition.name} onChange={onChangeTransitionName}/></td>
            <td>
                <div>
                    {transition.source.name}
                </div>

                {/*                 
                <TextInput 
                    key={transition.source.id} 
                    placeholder={"source name"} 
                    id={wid} 
                    value={transition.source.name} 
                    onChange={(value) => onChangeTransitionName(value, transition)}
                /> */}

            </td>
            <td>
                <div>
                    {transition.destination.name}
                </div>
                {/*                 
                <TextInput 
                    key={transition.destination.id} 
                    placeholder={"destination name"} 
                    id={wid} 
                    value={transition.destination.name} 
                    onChange={(value) => onChangeTransitionName(value, transition)}
                />
                 */}
            </td>
            <td>
                <DeleteButton onClick={onDeleteButtonClick}><Trash /></DeleteButton><br/>
            </td>
        </tr>
    )
}