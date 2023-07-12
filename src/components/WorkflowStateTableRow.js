import { Trash, Info, PencilFill } from 'react-bootstrap-icons';

import { TextInput } from './TextInput';
import { DeleteButton } from './DeleteButton';
import { useState } from 'react';


/**
 * One member as a table row
 * @param {*} param0 
 * @returns 
 */

export const WorkflowStateTableRow = ({index, state, actions, wid, openModal: onOpenModal}) => {

    //delete button action
    const onDeleteButtOnClick = () => {
        const payload = {workflow: {id: wid}, state: state}
        //actions.onWorkflowStateRemove(payload)

        if (actions.onWorkflowStateUpdate) {
            console.log("onDeleteButtonOnClick: ", state)
            const payload = {workflow: {id: wid}, state: {...state, valid: false}}

            actions.workflowStateAsyncUpdate(payload)
                .then(json => console.log("WorkflowStateAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowStateUpdate.msg))
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }

    //info button action
    const onInfoButtonClick = () => {
        onOpenModal(state) // rename to on....
    }

    //change state name callback
    const onChangeStateName = (value) => {
        if (actions.onWorkflowStateUpdate) {
            console.log("onChangeName: ", state, value)
            const payload = {workflow: {id: wid}, state: {...state, name: value}}

            actions.workflowStateAsyncUpdate(payload)
                .then(json => console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg))
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }

    if(!state.valid){
        return
    }
    return (
        <tr>
            <td>{index}: </td>
            <td>{state.id}</td>
            <td><TextInput placeholder={"name"} id={wid} value={state.name} onChange={onChangeStateName}/></td>
            <td>
                {state.nextTransitions.map((transition) => (
                    <div key={transition.id}>
                        {transition.name}
                    </div>
                ))}
            </td>
            <td>
                <DeleteButton onClick={onDeleteButtOnClick}><Trash /></DeleteButton>
                <button className='btn btn-sm btn-info' onClick={onInfoButtonClick}><Info /></button>
            </td>
        </tr>
    )
}