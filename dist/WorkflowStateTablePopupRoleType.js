import { WorkflowStateTablePopupRoleTypeRow } from "./WorkflowStateTablePopupRoletypeRow.js";
import { WorkflowStateTablePopupAddRoleType } from "./WorkflowStateTablePopupAddRoleType.js";
export const WorkflowStateTablePopupRoleType = ({
  workflow,
  actions,
  modalState,
  setRoleTypesInState
}) => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Role types"), /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Options"))), /*#__PURE__*/React.createElement("tbody", null, modalState?.roletypes?.map((roleType, index) => /*#__PURE__*/React.createElement(WorkflowStateTablePopupRoleTypeRow, {
    key: roleType.id,
    roleType: roleType,
    index: index + 1,
    actions: actions,
    wid: workflow.id,
    stateId: modalState.id,
    setRoleTypesInState: setRoleTypesInState
  })))), /*#__PURE__*/React.createElement(WorkflowStateTablePopupAddRoleType, {
    state: modalState,
    actions: actions,
    wid: workflow.id,
    setRoleTypesInState: setRoleTypesInState
  }));
};