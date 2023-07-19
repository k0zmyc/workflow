import React from 'react';
export const WorkflowStateTablePopupAddRoleTypeModalTableRow = ({
  roleType,
  state,
  actions,
  wid,
  index,
  closeModal,
  setRoleTypesInState
}) => {
  const onAddRoleType = () => {
    if (actions.onWorkflowStateUpdate) {
      const payload = {
        workflow: {
          id: wid
        },
        state: state,
        roleType: roleType
      };
      actions.workflowStateAsyncAddRoleType(payload).then(json => {
        console.log("workflowStateAsyncAddRoleType: ", json.data.workflowStateAddRole.msg);
        const roleTypes = json.data.workflowStateAddRole.state.roletypes;
        if (json.data.workflowStateAddRole.msg === "ok") setRoleTypesInState(roleTypes);
      }).then(() => actions.workflowFetch(wid)); // update page after change - not ideal but better than nothing
    }

    closeModal();
  };
  if (roleType == null) return;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, index), /*#__PURE__*/React.createElement("td", null, roleType.id), /*#__PURE__*/React.createElement("td", null, roleType.name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success",
    onClick: onAddRoleType
  }, "Add role type")));
};