import { DeleteButton } from "./DeleteButton.js";
import { Trash } from 'react-bootstrap-icons';

/**
 * Renders a table row for a single user in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupUserRow component.
 * @param {number} param0.index - The index of the user row.
 * @param {Object} param0.user - The user object containing information about the user.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {string} param0.wid - The ID of the workflow.
 * @param {string} param0.stateId - The ID of the workflow state.
 * @param {Function} param0.setUsersInState - Callback function to set users in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupUserRow component.
 */
export const WorkflowStateTablePopupUserRow = ({index, user, actions, wid, stateId, setUsersInState}) => {
    
    //delete button action
    const onDeleteButtonClick = () => {
        const payload = {workflow: {id: wid}, workflowstateId: stateId, userId: user.user.id, }

        if (actions.onWorkflowStateUpdate) {
            console.log("onDeleteButtonsClick payload: ", payload)
            actions.workflowStateAsyncRemoveUser(payload)
                .then(json => {
                    console.log("WorkflowStateAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowStateRemoveUser.msg)
                    const users = json.data.workflowStateRemoveUser.state.users
                    if(json.data.workflowStateRemoveUser.msg === "ok") setUsersInState(users)
                })
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }

    if(user == null) return
    return(
        <tr>
            <th>{index}:</th>
            <th>{user?.user?.id}</th>
            <th>{user?.user?.name}</th>
            <th>{user?.user?.surname}</th>
            <th><DeleteButton onClick={onDeleteButtonClick}><Trash /></DeleteButton></th>
        </tr>
    )
}