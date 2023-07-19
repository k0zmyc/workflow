import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { WorkflowStateTablePopupAddUserModalTableRow } from './WorkflowStateTablePopupAddUserModalTableRow';
export const WorkflowStateTablePopupAddUserModalTable = ({
  state,
  actions,
  wid,
  isOpen,
  closeModal,
  setUsersInState
}) => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    actions.userAsyncQuery().then(json => setUsers(json.data.userPage));
  }, [actions]);
  return /*#__PURE__*/React.createElement(ReactModal, {
    isOpen: isOpen,
    onRequestClose: closeModal
  }, /*#__PURE__*/React.createElement("h2", null, "Add User"), /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Surname"), /*#__PURE__*/React.createElement("th", null, "Options"))), /*#__PURE__*/React.createElement("tbody", null, users?.map((user, index) => /*#__PURE__*/React.createElement(WorkflowStateTablePopupAddUserModalTableRow, {
    key: user.id,
    user: user,
    state: state,
    index: index + 1,
    actions: actions,
    wid: wid,
    closeModal: closeModal,
    setUsersInState: setUsersInState
  })))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: closeModal
  }, "Cancel"));
};