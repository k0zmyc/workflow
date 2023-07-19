import { DeleteButton } from "./DeleteButton.js";
import { Trash } from 'react-bootstrap-icons';

export const WorkflowStateTablePopupUserRow = ({index, user, actions, wid, stateId, setUsersInState}) => {
    
    //delete button action
    const onDeleteButtonClick = () => {
        const payload = {workflow: {id: wid}, workflowstateId: stateId, userId: user.user.id, }

        if (actions.onWorkflowStateUpdate) {
            console.log("onDeleteButtonsClick: ", payload)

            actions.workflowStateAsyncRemoveUser(payload)
                .then(json => {
                    console.log("WorkflowStateAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowStateRemoveUser.msg)
                    const users = json.data.workflowStateRemoveUser.state.users
                    setUsersInState(users)
                })
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }

    if(user == null) return
    //console.log("WorkflowStateTablePopupUserRow user: ", user)
    return(
        <tr>
            <th>{index}:</th>
            <th>{user.user.id}</th>
            <th>{user.user.name}</th>
            <th>{user.user.surname}</th>
            <th><DeleteButton onClick={onDeleteButtonClick}><Trash /></DeleteButton></th>
        </tr>
    )
}