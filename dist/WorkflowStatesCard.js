import Card from "react-bootstrap/Card";
import { WorkflowStatesTable } from './WorkflowStatesTable';
import { WorkflowTransitionsTable } from './WorkflowTransitionsTable';

/**
 * Renders a card containing a list of workflow members.
 */
export const WorkflowStatesCard = ({
  workflow,
  actions
}) => {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Card.Header, null, /*#__PURE__*/React.createElement(Card.Title, null, "States")), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(WorkflowStatesTable, {
    workflow: workflow,
    actions: actions
  })));
};