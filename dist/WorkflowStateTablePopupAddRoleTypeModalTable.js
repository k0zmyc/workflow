import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { WorkflowStateTablePopupAddRoleTypeModalTableRow } from './WorkflowStateTablePopupAddRoleTypeModalTableRow';

/**
 * Renders a modal table for adding role types to a state.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupAddRoleTypeModalTable component.
 * @param {Object} param0.state - The state object containing information about the state.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {string} param0.wid - The ID of the workflow.
 * @param {boolean} param0.isOpen - Indicates whether the modal is open or not.
 * @param {Function} param0.closeModal - Callback function to close the modal.
 * @param {Function} param0.setRoleTypesInState - Callback function to set role types in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupAddRoleTypeModalTable component.
 */
export const WorkflowStateTablePopupAddRoleTypeModalTable = ({
  state,
  actions,
  wid,
  isOpen,
  closeModal,
  setRoleTypesInState
}) => {
  const [roleTypes, setRoleTypes] = useState(null);
  useEffect(() => {
    actions.roleTypeAsyncQuery().then(json => setRoleTypes(json.data.roleTypePage));
  }, [actions]);
  return /*#__PURE__*/React.createElement(ReactModal, {
    isOpen: isOpen,
    onRequestClose: closeModal
  }, /*#__PURE__*/React.createElement("h2", null, "Add Role Type"), /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Options"))), /*#__PURE__*/React.createElement("tbody", null, roleTypes?.map((roleType, index) => /*#__PURE__*/React.createElement(WorkflowStateTablePopupAddRoleTypeModalTableRow, {
    key: roleType.id,
    roleType: roleType,
    state: state,
    index: index + 1,
    actions: actions,
    wid: wid,
    closeModal: closeModal,
    setRoleTypesInState: setRoleTypesInState
  })))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: closeModal
  }, "Cancel"));
};