import Card from "react-bootstrap/Card";
import { WorkflowTransitionsTable } from './WorkflowTransitionsTable';

/**
 * Renders a card containing a list of workflow transitions.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.workflow - The workflow object containing information about the workflow.
 * @param {Object} props.actions - Actions object to interact with workflow transitions.
 * @returns {JSX.Element} - JSX element representing the WorkflowTransitionsCard component.
 */
export const WorkflowTransitionsCard = ({
  workflow,
  actions
}) => {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Card.Header, null, /*#__PURE__*/React.createElement(Card.Title, null, "Transitions")), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(WorkflowTransitionsTable, {
    workflow: workflow,
    actions: actions
  })));
};