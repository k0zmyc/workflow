import { WorkflowTransitionTableRow } from "./WorkflowTransitionTableRow.js";

/**
 * Renders a table of transitions in the workflow.
 *
 * @param {Object} param0 - Props for the WorkflowTransitionsTable component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the workflow.
 * @returns {JSX.Element} - The JSX element representing the WorkflowTransitionsTable component.
 */
export const WorkflowTransitionsTable = ({
  workflow,
  actions
}) => {
  return /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Transition name"), /*#__PURE__*/React.createElement("th", null, "Source"), /*#__PURE__*/React.createElement("th", null, "Destination"), /*#__PURE__*/React.createElement("th", null, "Options"))), /*#__PURE__*/React.createElement("tbody", null, workflow?.transitions?.map((transition, index) => /*#__PURE__*/React.createElement(WorkflowTransitionTableRow, {
    key: transition.id,
    transition: transition,
    index: index + 1,
    actions: actions,
    wid: workflow.id
  }))));
};