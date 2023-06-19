import Card from "react-bootstrap/Card";

import { WorkflowStatesTable } from './WorkflowStatesTable';
import { WorkflowTransitionsTable } from './WorkflowTransitionsTable';

/**
 * Renders a card containing a list of workflow members.
 */
export const WorkflowStatesCard = ({workflow, actions}) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    States
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <WorkflowStatesTable workflow={workflow} actions={actions}/>
            </Card.Body>
        </Card>
    )
}