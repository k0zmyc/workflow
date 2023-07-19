import Card from "react-bootstrap/Card";
import { WorkflowTransitionsTable } from './WorkflowTransitionsTable';

/**
 * Renders a card containing a list of workflow transitions.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.workflow - The workflow object containing information about the workflow.
 * @param {Object} props.actions - Actions object to interact with workflow transitions.
 * @returns {JSX.Element} - JSX element representing the WorkflowTransitionsCard component.
 */
export const WorkflowTransitionsCard = ({workflow, actions}) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    Transitions
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <WorkflowTransitionsTable workflow={workflow} actions={actions}/>
            </Card.Body>
        </Card>
    )
}