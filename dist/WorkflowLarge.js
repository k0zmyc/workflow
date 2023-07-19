import Card from "react-bootstrap/Card";
import { WorkflowStatesCard } from './WorkflowStatesCard';
import { WorkflowTransitionsCard } from "./WorkflowTransitionsCard";
import { WorkflowNameInput } from "./WorkflowNameInput";

/**
 * Renders a card describing a workflow in detailed form.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.workflow - The workflow object containing information about the workflow.
 * @param {Object} props.actions - Actions object to interact with the workflow.
 * @returns {JSX.Element} - JSX element representing the WorkflowLarge component.
 */
export const WorkflowLarge = ({
  workflow,
  actions
}) => {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Card.Header, null, /*#__PURE__*/React.createElement(Card.Title, null, "Workflow ID: ", workflow.id, " ", /*#__PURE__*/React.createElement("br", null), workflow.name, " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(WorkflowNameInput, {
    workflow: workflow,
    actions: actions
  }))), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(WorkflowStatesCard, {
    workflow: workflow,
    actions: actions
  })), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(WorkflowTransitionsCard, {
    workflow: workflow,
    actions: actions
  })));
};