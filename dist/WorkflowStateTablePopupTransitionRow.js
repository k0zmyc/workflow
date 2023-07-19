/**
 * @function
 * @param {int} index
 * @param {int} transition
 * @returns 
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