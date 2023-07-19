import { DeleteButton } from "./DeleteButton.js";
import { Trash } from 'react-bootstrap-icons';
export const WorkflowStateTablePopupUserRow = ({
  index,
  user,
  actions,
  wid,
  stateId,
  setUsersInState
}) => {
  //delete button action
  const onDeleteButtonClick = () => {
    const payload = {
      workflow: {
        id: wid
      },
      workflowstateId: stateId,
      userId: user.user.id
    };
    if (actions.onWorkflowStateUpdate) {
      //console.log("onDeleteButtonsClick: ", payload)
      actions.workflowStateAsyncRemoveUser(payload).then(json => {
        console.log("WorkflowStateAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowStateRemoveUser.msg);
        const users = json.data.workflowStateRemoveUser.state.users;
        if (json.data.workflowStateRemoveUser.msg === "ok") setUsersInState(users);
      }).then(() => actions.workflowFetch(wid)); // update page after change - not ideal but better than nothing
    }
  };

  if (user == null) return;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, index, ":"), /*#__PURE__*/React.createElement("th", null, user?.user?.id), /*#__PURE__*/React.createElement("th", null, user?.user?.name), /*#__PURE__*/React.createElement("th", null, user?.user?.surname), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement(DeleteButton, {
    onClick: onDeleteButtonClick
  }, /*#__PURE__*/React.createElement(Trash, null))));
};