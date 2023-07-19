import { useState } from "react";
import { WorkflowStateTablePopupAddRoleTypeModalTable } from "./WorkflowStateTablePopupAddRoleTypeModalTable.js";
export const WorkflowStateTablePopupAddRoleType = ({
  state,
  actions,
  wid,
  setRoleTypesInState
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
  }, "Add a Role Type"))))), /*#__PURE__*/React.createElement(WorkflowStateTablePopupAddRoleTypeModalTable, {
    isOpen: isModalOpen,
    closeModal: closeModal,
    state: state,
    actions: actions,
    wid: wid,
    setRoleTypesInState: setRoleTypesInState
  }));
};