import Card from "react-bootstrap/Card";

import { WorkflowStatesCard } from './WorkflowStatesCard';
import { WorkflowTransitionsCard } from "./WorkflowTransitionsCard";
import { WorkflowNameInput } from "./WorkflowNameInput";

/**
 * Renders a card describing a group im detailed form.
 * @param {*} param0 
 * @returns 
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