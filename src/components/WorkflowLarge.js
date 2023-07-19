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
export const WorkflowLarge = ({workflow, actions}) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    Workflow ID: {workflow.id} <br />
                    {workflow.name} <br />
                    <WorkflowNameInput workflow={workflow} actions={actions} />
                </Card.Title>
            </Card.Header>

            <Card.Body>
                <WorkflowStatesCard workflow={workflow} actions={actions} />
            </Card.Body>
            
            <Card.Body>
                <WorkflowTransitionsCard workflow={workflow} actions={actions} />
            </Card.Body>
        </Card>
    )
}