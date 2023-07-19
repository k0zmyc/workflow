import { DeleteButton } from "./DeleteButton.js";
import { Trash } from 'react-bootstrap-icons';

export const WorkflowStateTablePopupUserRow = ({index, user, actions, wid, stateId}) => {
    
    //delete button action
    const onDeleteButtonClick = () => {
        //console.log("User ID: ", user.user.id)
        const payload = {workflow: {id: wid}, workflowstateId: stateId, userId: user.user.id, }
        // //actions.onWorkflowStateRemove(payload)

        if (actions.onWorkflowStateUpdate) {
            console.log("onDeleteButtonsClick: ", payload)

            actions.workflowStateAsyncRemoveUser(payload)
                //.then(json => console.log("WorkflowStateAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowStateRemoveUser.msg))
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }

    //console.log("WorkflowStateTablePopupUserRow: ", user)
    if(user == null) return
    console.log("WorkflowStateTablePopupUserRow: ", user)
    return(
        <tr key={user.user.id}>
            <th>{index}:</th>
            <th>{user.user.id}</th>
            <th>{user.user.name}</th>
            <th>{user.user.surname}</th>
            <th><DeleteButton onClick={onDeleteButtonClick}><Trash /></DeleteButton></th>
        </tr>
    )
}