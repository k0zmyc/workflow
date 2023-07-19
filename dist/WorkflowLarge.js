import Card from "react-bootstrap/Card";
import { WorkflowStatesCard } from './WorkflowStatesCard';
import { WorkflowTransitionsCard } from "./WorkflowTransitionsCard";
import { WorkflowNameInput } from "./WorkflowNameInput";
import { Workflow } from "./Graph/WorkflowGraph";

/**
 * Renders a card describing a group im detailed form.
 * @param {*} param0 
 * @returns 
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
  })), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Workflow, {
    workflow: workflow,
    actions: actions
  })));
};