/**
 * @function
 * @param {int} index
 * @param {int} transition
 * @returns 
 */
export const WorkflowStateTablePopupTransitionRow = ({index, transition, actions, wid}) => {

    // filter out transition that are not valid
    if(transition.valid === false) return
    if(!transition) return

    console.log("WorkflowStateTablePopupTransitionRow: ", transition)

    return(
        <tr key={transition.id}>
            <th>{index}</th>
            <th>{transition.id}</th>
            <th>{transition.name}</th>
            <th>{transition.destination.name}</th>
        </tr> 
    )
}