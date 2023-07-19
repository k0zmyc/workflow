import Card from "react-bootstrap/Card";
import { WorkflowStatesTable } from './WorkflowStatesTable';

/**
 * Renders a card containing a list of workflow states.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.workflow - The workflow object.
 * @param {Object} props.actions - Actions object to interact with workflow states.
 * @returns {JSX.Element} - JSX element representing the WorkflowStatesCard component.
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