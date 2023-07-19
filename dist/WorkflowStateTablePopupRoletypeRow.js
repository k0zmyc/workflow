import { DeleteButton } from "./DeleteButton.js";
import { Trash } from 'react-bootstrap-icons';
export const WorkflowStateTablePopupRoleTypeRow = ({
  index,
  roleType,
  actions,
  wid,
  stateId,
  setRoleTypesInState
}) => {
  //delete button action
  const onDeleteButtonClick = () => {
    const payload = {
      workflow: {
        id: wid
      },
      workflowstateId: stateId,
      roletypeId: roleType.roleType.id
    };
    if (actions.onWorkflowStateUpdate) {
      //console.log("onDeleteButtonsClick payload: ", payload)
      actions.workflowStateAsyncRemoveRoleType(payload).then(json => {
        console.log("workflowStateAsyncRemoveRoleType onDeleteButtonOnClick: ", json.data.workflowStateRemoveRole.msg);
        const roleTypes = json.data.workflowStateRemoveRole.state.roletypes;
        if (json.data.workflowStateRemoveRole.msg === "ok") setRoleTypesInState(roleTypes);
      }).then(() => actions.workflowFetch(wid)); // update page after change - not ideal but better than nothing
    }
  };

  return /*#__PURE__*/React.createElement("tr", {
    key: roleType?.roleType?.id
  }, /*#__PURE__*/React.createElement("th", null, index), /*#__PURE__*/React.createElement("th", null, roleType?.roleType?.id), /*#__PURE__*/React.createElement("th", null, roleType?.roleType?.name), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement(DeleteButton, {
    onClick: onDeleteButtonClick
  }, /*#__PURE__*/React.createElement(Trash, null))));
};