import React from 'react';

/**
 * Renders a table row for adding a user in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupAddUserModalTableRow component.
 * @param {Object} param0.user - The user object containing information about the user.
 * @param {Object} param0.state - The state object containing information about the workflow state.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {string} param0.wid - The ID of the workflow.
 * @param {int} param0.index - The index of the user row.
 * @param {Function} param0.closeModal - Callback function to close the modal.
 * @param {Function} param0.setUsersInState - Callback function to set users in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupAddUserModalTableRow component.
 */
export const WorkflowStateTablePopupAddUserModalTableRow = ({user, state, actions, wid, index, closeModal, setUsersInState }) => {
    const onAddUser = () => {
        if (actions.onWorkflowStateUpdate) {
            //console.log("onAddUser user: ", user)
            const payload = {workflow: {id: wid}, state: state, user: user}

            actions.workflowStateAsyncAddUser(payload)
                .then(json => {
                    console.log("workflowStateAsyncAddUser: ", json.data.workflowStateAddUser.msg)
                    const users = json.data.workflowStateAddUser.state.users
                    if(json.data.workflowStateAddUser.msg === "ok") setUsersInState(users)
                })
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
        closeModal()
    }

    if(user == null) return
    return (
        <tr>
            <td>{index}</td>
            <td>{user?.id}</td>
            <td>{user?.name}</td>
            <td>{user?.surname}</td>
            <td><button className="btn btn-success" onClick={onAddUser}>Add user</button></td>
        </tr>
    );
};