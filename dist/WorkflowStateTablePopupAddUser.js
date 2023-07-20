import { useState } from "react";
import { WorkflowStateTablePopupAddUserModalTable } from "./WorkflowStateTablePopupAddUserModalTable.js";

/**
 * Renders a table row for adding a user in the popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupAddUser component.
 * @param {Object} param0.state - The state object containing information about the workflow state.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {string} param0.wid - The ID of the workflow.
 * @param {Function} param0.setUsersInState - Callback function to set users in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupAddUser component.
 */
export const WorkflowStateTablePopupAddUser = ({
  state,
  actions,
  wid,
  setUsersInState
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: openModal
  }, "Add a user"))))), /*#__PURE__*/React.createElement(WorkflowStateTablePopupAddUserModalTable, {
    isOpen: isModalOpen,
    closeModal: closeModal,
    state: state,
    actions: actions,
    wid: wid,
    setUsersInState: setUsersInState
  }));
};