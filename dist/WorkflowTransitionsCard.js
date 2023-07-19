import Card from "react-bootstrap/Card";
import { WorkflowTransitionsTable } from './WorkflowTransitionsTable';

/**
 * Renders a card containing a list of group members.
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