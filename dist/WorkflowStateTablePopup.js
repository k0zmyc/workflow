import ReactModal from 'react-modal';
import { WorkflowStateTablePopupUser } from './WorkflowStateTablePopupUser.js';
import { WorkflowStateTablePopupTransition } from './WorkflowStateTablePopupTransition.js';
import { WorkflowStateTablePopupRoleType } from './WorkflowStateTablePopupRoleType.js';
export const WorkflowStateTablePopup = ({
  workflow,
  actions,
  modalState,
  modalIsOpen,
  closeModal,
  addTransitionToState,
  setUsersInState,
  setRoleTypesInState
}) => {
  return /*#__PURE__*/React.createElement(ReactModal, {
    isOpen: modalIsOpen
  }, /*#__PURE__*/React.createElement(WorkflowStateTablePopupTransition, {
    workflow: workflow,
    actions: actions,
    modalState: modalState,
    addTransitionToState: addTransitionToState
  }), /*#__PURE__*/React.createElement(WorkflowStateTablePopupUser, {
    workflow: workflow,
    actions: actions,
    modalState: modalState,
    setUsersInState: setUsersInState
  }), /*#__PURE__*/React.createElement(WorkflowStateTablePopupRoleType, {
    workflow: workflow,
    actions: actions,
    modalState: modalState,
    setRoleTypesInState: setRoleTypesInState
  }), /*#__PURE__*/React.createElement("button", {
    onClick: closeModal,
    className: "btn btn-sm btn-danger"
  }, "Close"));
};