import React from 'react';

export const WorkflowStateTablePopupAddRoleTypeModalTableRow = ({ roleType, state, actions, wid, index, closeModal, setRoleTypesInState}) => {

    const onAddRoleType = () => {
        console.log(roleType)
        if (actions.onWorkflowStateUpdate) {
            console.log("onAddRoleType: ", roleType)
            const payload = {workflow: {id: wid}, state: state, roleType: roleType}

            actions.workflowStateAsyncAddRoleType(payload)
                .then(json => {
                    console.log("workflowStateAsyncAddRoleType: ", json.data.workflowStateAddRole)
                    const roleTypes = json.data.workflowStateAddRole.state.roletypes
                    setRoleTypesInState(roleTypes)
                })
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
        closeModal()
    }


    if(roleType == null) return
    return (
        <tr>
            <td>{index}</td>
            <td>{roleType.id}</td>
            <td>{roleType.name}</td>
            <td><button className="btn btn-success" onClick={onAddRoleType}>Add role type</button></td>
        </tr>
    );
};