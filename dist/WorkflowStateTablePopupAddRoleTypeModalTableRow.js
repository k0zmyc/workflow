import React from 'react';

/**
 * Renders a table row for adding a role type in the popup modal table.
 *
 * @param {Object} param0 - Props for the WorkflowStateTablePopupAddRoleTypeModalTableRow component.
 * @param {Object} param0.roleType - The role type object containing information about the role type.
 * @param {Object} param0.state - The state object containing information about the state.
 * @param {Object} param0.actions - The actions object providing functions to interact with the state.
 * @param {string} param0.wid - The ID of the workflow.
 * @param {number} param0.index - The index of the role type row in the modal table.
 * @param {Function} param0.closeModal - Callback function to close the modal.
 * @param {Function} param0.setRoleTypesInState - Callback function to set role types in the state.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStateTablePopupAddRoleTypeModalTableRow component.
 */
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