import { Trash, Info, PencilFill } from 'react-bootstrap-icons';

import { TextInput } from './TextInput';
import { DeleteButton } from './DeleteButton';
import { useState } from 'react';


/**
 * One member as a table row
 * @param {*} param0 
 * @returns 
 */

export const WorkflowStateTableRow = ({index, state, actions, wid, onOpenModal}) => {

    //delete button action - disvalidate state
    const onDeleteButtonClick = () => {
        if (actions.onWorkflowStateUpdate) {
            console.log("onDeleteButtonOnClick: ", state)
            const payload = {workflow: {id: wid}, state: {...state, valid: false}}

            actions.workflowStateAsyncUpdate(payload)
                .then(json => console.log("WorkflowStateAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowStateUpdate.msg))
                //.then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
            

            // disvalidating all transitions to and from this state
            state.nextTransitions?.map((nextTransition) => {
                console.log("Disvalidating transition: ", nextTransition)
                const payload = {workflow: {id: wid}, transition: {...nextTransition, valid: false}}
                actions.workflowTransitionAsyncUpdate(payload)
                    //.then(json => console.log("WorkflowTransitionAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowTransitionUpdate.msg))
            })

            state.previousTransitions?.map((previousTransition) => {
                console.log("Disvalidating transition: ", previousTransition)
                const payload = {workflow: {id: wid}, transition: {...previousTransition, valid: false}}
                actions.workflowTransitionAsyncUpdate(payload)
                    //.then(json => console.log("WorkflowTransitionAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowTransitionUpdate.msg))
            })

            actions.workflowFetch(wid)
        }
    }

    //info button action
    const onInfoButtonClick = () => {
        onOpenModal(state)
    }

    //change state name callback
    const onChangeStateName = (value) => {
        if (actions.onWorkflowStateUpdate) {
            console.log("onChangeName: ", state, value)
            const payload = {workflow: {id: wid}, state: {...state, name: value, valid: true}}

            actions.workflowStateAsyncUpdate(payload)
                .then(json => console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg))
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }

    // creating list of valid transitions (valid === true || valid == null)
    const validTransitions = state?.nextTransitions?.filter(
        (transition) => (transition.valid !== false )
    );


    // when should I not include a state in the table
    if(state.valid == false){
        return
    }
    return (
        <tr>
            <td>{index}: </td>
            <td>{state.id}</td>
            <td><TextInput placeholder={"name"} id={wid} value={state.name} onChange={onChangeStateName}/></td>
            <td>
                {validTransitions?.map((transition) => (
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