export const WorkflowStateTablePopupTransitionRow = ({index, transition, actions, wid}) => {

    // filter out transition that are not valid
    if(transition.valid === false) return

    return(
        <tr>
            <th>{index}</th>
            <th>{transition.id}</th>
            <th>{transition.name}</th>
            <th>{transition.destination.name}</th>
        </tr> 
    )
}