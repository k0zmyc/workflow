import { DeleteButton } from "./DeleteButton.js";
import { Trash } from 'react-bootstrap-icons';


export const WorkflowStateTablePopupRoleTypeRow = ({index, roleType, actions, wid, stateId}) => {
    
    //delete button action
    const onDeleteButtonClick = () => {
        const payload = {workflow: {id: wid}, workflowstateId: stateId, roletypeId: roleType.roleType.id, }

        if (actions.onWorkflowStateUpdate) {
            console.log("onDeleteButtonsClick: ", payload)

            actions.workflowStateAsyncRemoveRoleType(payload)
                .then(json => console.log("workflowStateAsyncRemoveRoleType onDeleteButtonOnClick: ", json.data.workflowStateRemoveRole.msg))
                .then(() => actions.workflowFetch(wid))   // update page after change - not ideal but better than nothing
        }
    }


    return(
        <tr>
            <th>{index}</th>
            <th>{roleType.roleType.id}</th>
            <th>{roleType.roleType.name}</th>
            <th><DeleteButton onClick={onDeleteButtonClick}><Trash /></DeleteButton></th>
        </tr> 
    )
}