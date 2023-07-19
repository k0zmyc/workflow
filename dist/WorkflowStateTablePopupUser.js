import { WorkflowStateTablePopupUserRow } from "./WorkflowStateTablePopupUserRow.js";
import { WorkflowStateTablePopupAddUser } from "./WorkflowStateTablePopupAddUser.js";

/**
 * Renders a table row for a single user in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupUser component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {Object} param0.modalState - The state object to display in the modal.
 * @param {Function} param0.setUsersInState - Callback function to set users in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupUser component.
 */
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