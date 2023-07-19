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
    const onDeleteButtOnClick = () => {
        if (actions.onWorkflowTransitionUpdate) {
            //console.log("onDeleteButtonOnClick WorkflowTransitionTableRow transition: ", transition)
            const payload = {workflow: {id: wid}, transition: {...transition, valid: false}}

            actions.workflowTransitionAsyncUpdate(payload)
                .then(json => console.log("WorkflowTransitionAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowTransitionUpdate.msg))
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }

    //change state name callback
    const onChangeTransitionName = (value) => {
        if (actions.onWorkflowTransitionUpdate) {
            const payload = {workflow: {id: wid}, transition: {...transition, name: value, valid: true}}

            actions.workflowTransitionAsyncUpdate(payload)
                .then(json=>console.log("WorkflowTransitionNameInput: ", json.data.workflowTransitionUpdate.msg))
                .then(() => actions.workflowFetch(wid))   // not ideal but better than nothing
        }
    }

    // when should I not include a transition in the table?
    if(transition.valid === false) return
    return (
        <tr>
            <td>{index}: </td>
            <td><TextInput placeholder={"transition name"} id={wid} value={transition.name} onChange={onChangeTransitionName}/></td>
            <td>
                <div>
                    {transition.source.name}
                </div>
            </td>
            <td>
                <div>
                    {transition.destination.name}
                </div>
            </td>
            <td>
                <DeleteButton onClick={onDeleteButtOnClick}><Trash /></DeleteButton><br/>
            </td>
        </tr>
    )
}