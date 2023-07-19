import ReactModal from 'react-modal';
import { WorkflowStateTablePopupUser } from './WorkflowStateTablePopupUser.js';
import { WorkflowStateTablePopupTransition } from './WorkflowStateTablePopupTransition.js';
import { WorkflowStateTablePopupRoleType } from './WorkflowStateTablePopupRoleType.js';

/**
 * Renders a popup modal displaying state, user, and role type data for a workflow state.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopup component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {Object} param0.modalState - The state object to display in the modal.
 * @param {boolean} param0.modalIsOpen - A boolean flag indicating whether the modal is open.
 * @param {Function} param0.closeModal - Callback function to close the modal.
 * @param {Function} param0.addTransitionToState - Callback function to add a transition to the state.
 * @param {Function} param0.setUsersInState - Callback function to set users in the state.
 * @param {Function} param0.setRoleTypesInState - Callback function to set role types in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopup component.
 */
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