/**
 * Renders a table row for a transition in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupTransitionRow component.
 * @param {int} param0.index - The index of the transition row.
 * @param {Object} param0.transition - The transition object containing information about the transition.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupTransitionRow component.
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