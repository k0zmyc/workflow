import React from 'react';
export const WorkflowStateTablePopupAddUserModalTableRow = ({
  user,
  state,
  actions,
  wid,
  index,
  closeModal,
  setUsersInState
}) => {
  const onAddUser = () => {
    if (actions.onWorkflowStateUpdate) {
      //console.log("onAddUser user: ", user)
      const payload = {
        workflow: {
          id: wid
        },
        state: state,
        user: user
      };
      actions.workflowStateAsyncAddUser(payload).then(json => {
        console.log("workflowStateAsyncAddUser: ", json.data.workflowStateAddUser.msg);
        const users = json.data.workflowStateAddUser.state.users;
        if (json.data.workflowStateAddUser.msg === "ok") setUsersInState(users);
      }).then(() => actions.workflowFetch(wid)); // update page after change - not ideal but better than nothing
    }

    closeModal();
  };
  if (user == null) return;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, index), /*#__PURE__*/React.createElement("td", null, user?.id), /*#__PURE__*/React.createElement("td", null, user?.name), /*#__PURE__*/React.createElement("td", null, user?.surname), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success",
    onClick: onAddUser
  }, "Add user")));
};