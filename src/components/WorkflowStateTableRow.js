import { Trash, Info, PencilFill } from 'react-bootstrap-icons';

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
        openModal(state)
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
                <DeleteButton onClick={onDeleteButtonClick}><Trash /></DeleteButton>
                <button className='btn btn-sm btn-info' onClick={onInfoButtonClick}><Info /></button>
            </td>
        </tr>
    )
}