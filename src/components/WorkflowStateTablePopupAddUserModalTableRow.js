import React from 'react';

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