import { TextInput } from './TextInput';

/**
 * Component to render a text input field for updating the workflow name.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.workflow - The workflow dictionary.
 * @param {Object} props.actions - Actions object to update the workflow name.
 * @returns {JSX.Element} - JSX element representing the WorkflowNameInput component.
 */
export const WorkflowNameInput = ({
  workflow,
  actions
}) => {
  const onchange = value => {
    actions.workflowAsyncUpdate({
      ...workflow,
      name: value
    }).then(json => console.log("WorkflowNameInput", json.data.workflowUpdate.msg));
  };
  return /*#__PURE__*/React.createElement(TextInput, {
    id: workflow.id,
    value: workflow.name,
    placeholder: "workflow name",
    onChange: onchange
  });
};