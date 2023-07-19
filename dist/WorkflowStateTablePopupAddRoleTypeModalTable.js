import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { WorkflowStateTablePopupAddRoleTypeModalTableRow } from './WorkflowStateTablePopupAddRoleTypeModalTableRow';
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