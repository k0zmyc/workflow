import { WorkflowStateTablePopupTransitionRow } from "./WorkflowStateTablePopupTransitionRow.js";
import { WorkflowStateTablePopupAddTransition } from "./WorkflowStateTablePopupAddTransition.js";
export const WorkflowStateTablePopupTransition = ({
  workflow,
  actions,
  modalState,
  addTransitionToState
}) => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "State data: ", modalState?.name), /*#__PURE__*/React.createElement("h4", null, "Transitions"), /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Destination"))), /*#__PURE__*/React.createElement("tbody", null, modalState?.nextTransitions?.map((transition, index) => /*#__PURE__*/React.createElement(WorkflowStateTablePopupTransitionRow, {
    key: transition.id,
    transition: transition,
    index: index + 1,
    actions: actions,
    wid: workflow.id
  })))), /*#__PURE__*/React.createElement(WorkflowStateTablePopupAddTransition, {
    state: modalState,
    actions: actions,
    wid: workflow.id,
    addTransitionToState: addTransitionToState
  }));
};