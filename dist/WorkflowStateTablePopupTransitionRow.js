/**
 * Renders a table row for a transition in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupTransitionRow component.
 * @param {int} param0.index - The index of the transition row.
 * @param {Object} param0.transition - The transition object containing information about the transition.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupTransitionRow component.
 */
export const WorkflowStateTablePopupTransitionRow = ({
  index,
  transition
}) => {
  // filter out transition that are not valid
  if (transition.valid === false) return;
  if (!transition) return;
  return /*#__PURE__*/React.createElement("tr", {
    key: transition?.id
  }, /*#__PURE__*/React.createElement("th", null, index), /*#__PURE__*/React.createElement("th", null, transition?.id), /*#__PURE__*/React.createElement("th", null, transition?.name), /*#__PURE__*/React.createElement("th", null, transition?.destination.name));
};