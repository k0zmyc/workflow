import { Trash } from 'react-bootstrap-icons';
import { TextInput } from './TextInput';
import { DeleteButton } from './DeleteButton';

/**
 * Renders a table row for a single transition in the workflow.
 *
 * @param {Object} param0 - Props for the WorkflowTransitionTableRow component.
 * @param {number} param0.index - The index of the transition row.
 * @param {Object} param0.transition - The transition object containing information about the transition.
 * @param {Object} param0.actions - The actions object providing functions to interact with the transition.
 * @param {string} param0.wid - The ID of the workflow.
 * @returns {JSX.Element} - The JSX element representing the WorkflowTransitionTableRow component.
 */
export const WorkflowTransitionTableRow = ({
  index,
  transition,
  actions,
  wid
}) => {
  //remove button action
  const onDeleteButtOnClick = () => {
    if (actions.onWorkflowTransitionUpdate) {
      //console.log("onDeleteButtonOnClick WorkflowTransitionTableRow transition: ", transition)
      const payload = {
        workflow: {
          id: wid
        },
        transition: {
          ...transition,
          valid: false
        }
      };
      actions.workflowTransitionAsyncUpdate(payload).then(json => console.log("WorkflowTransitionAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowTransitionUpdate.msg)).then(() => actions.workflowFetch(wid)); // update page after change - not ideal but better than nothing
    }
  };

  //change state name callback
  const onChangeTransitionName = value => {
    if (actions.onWorkflowTransitionUpdate) {
      const payload = {
        workflow: {
          id: wid
        },
        transition: {
          ...transition,
          name: value,
          valid: true
        }
      };
      actions.workflowTransitionAsyncUpdate(payload).then(json => console.log("WorkflowTransitionNameInput: ", json.data.workflowTransitionUpdate.msg)).then(() => actions.workflowFetch(wid)); // not ideal but better than nothing
    }
  };

  // when should I not include a transition in the table?
  if (transition.valid === false) return;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, index, ": "), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "transition name",
    id: wid,
    value: transition.name,
    onChange: onChangeTransitionName
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, transition.source.name)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", null, transition.destination.name)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DeleteButton, {
    onClick: onDeleteButtOnClick
  }, /*#__PURE__*/React.createElement(Trash, null)), /*#__PURE__*/React.createElement("br", null)));
};