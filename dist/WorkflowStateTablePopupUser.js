import { WorkflowStateTablePopupUserRow } from "./WorkflowStateTablePopupUserRow.js";
import { WorkflowStateTablePopupAddUser } from "./WorkflowStateTablePopupAddUser.js";
export const WorkflowStateTablePopupUser = ({
  workflow,
  actions,
  modalState,
  setUsersInState
}) => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Users"), /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Surname"), /*#__PURE__*/React.createElement("th", null, "Options"))), /*#__PURE__*/React.createElement("tbody", null, modalState?.users?.map((user, index) => /*#__PURE__*/React.createElement(WorkflowStateTablePopupUserRow, {
    key: user.id,
    user: user,
    index: index + 1,
    actions: actions,
    wid: workflow.id,
    stateId: modalState.id,
    setUsersInState: setUsersInState
  })))), /*#__PURE__*/React.createElement(WorkflowStateTablePopupAddUser, {
    state: modalState,
    actions: actions,
    wid: workflow.id,
    setUsersInState: setUsersInState
  }));
};