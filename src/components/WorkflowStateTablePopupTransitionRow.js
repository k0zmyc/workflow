/**
 * @function
 * @param {int} index
 * @param {int} transition
 * @returns 
 */
export const WorkflowStateTablePopupTransitionRow = ({index, transition}) => {

    // filter out transition that are not valid
    if(transition.valid === false) return
    if(!transition) return

    return(
        <tr key={transition?.id}>
            <th>{index}</th>
            <th>{transition?.id}</th>
            <th>{transition?.name}</th>
            <th>{transition?.destination.name}</th>
        </tr> 
    )
}