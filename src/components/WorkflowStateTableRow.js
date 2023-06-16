import { Trash, Info } from 'react-bootstrap-icons';

import { TextInput } from './TextInput';
import { DeleteButton } from './DeleteButton';
import { useState } from 'react';


/**
 * One member as a table row
 * @param {*} param0 
 * @returns 
 */

export const WorkflowStateTableRow = ({index, state, actions, wid, openModal}) => {

    //delete button action
    const onDeleteButtonClick = () => {
        const payload = {workflow: {id: wid}, state: state}
        actions.onWorkflowStateRemove(payload)
    }

    //info button action
    const onInfoButtonClick = () => {
        //console.log("onInfoButtonClick: ", state)
        openModal(state)
    }

    //change state name callback
    const onChangeStateName = (value) => {
        if (actions.onWorkflowStateUpdate) {
            console.log("onChangeName: ", state, value)
            const payload = {workflow: {id: wid}, state: {...state, name: value}}

            //looks like I dont need this because its called in actions.workflowStateAsyncUpdate
            //actions.onWorkflowStateUpdate(payload)

            actions.workflowStateAsyncUpdate(payload)
                .then(json=>console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg))
                .then(() => actions.workflowFetch(wid))   // not ideal but better than nothing
        }
    }

    //change transition name callback
    const onChangeTransitionName = (value, transition) => {
        
        // paused for now - visualize transitions first
        console.log("Transition changes are not implemented yet")
        /*
        if (actions.onWorkflowTransitionUpdate) {
            
            //console.log("onChangeName: ", state, value)
            const payload = {workflow: {id: wid}, transition: {...transition, name: value}}
            // actions.onWorkflowTransitionUpdate(payload)
            console.log("onChangeTransitionName payload ", payload)

            actions.onWorkflowTransitionUpdate(payload)

            // actions.workflowStateAsyncUpdate(payload)
            //     .then(json=>console.log("WorkflowTransitionNameInput: ", json.data.workflowTransitionUpdate.msg))
        }
        */
    }

    return (
        <tr>
            <td>{index}: </td>
            <td><TextInput placeholder={"name"} id={wid} value={state.name} onChange={onChangeStateName}/></td>
            <td>
                {state.nextTransitions.map((transition) => (
                    <div key={transition.id}>
                        {transition.name}
                    </div>
                    
                     
                    /* 
                    <TextInput 
                    key={transition.id} 
                    placeholder={"transition"} 
                    id={wid} 
                    value={transition.name} 
                    onChange={(value) => onChangeTransitionName(value, transition)}
                    />
                    */
                ))}
            </td>
            <td>
                <DeleteButton onClick={onDeleteButtonClick}><Trash /></DeleteButton>
                <button className='btn btn-sm btn-info' onClick={onInfoButtonClick}><Info/></button>
            </td>
        </tr>
    )
}