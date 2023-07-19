import { useState } from "react";
import { WorkflowStateTablePopupAddUserModalTable } from "./WorkflowStateTablePopupAddUserModalTable.js";
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