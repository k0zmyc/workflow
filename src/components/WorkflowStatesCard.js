import Card from "react-bootstrap/Card";

import { WorkflowStatesTable } from './WorkflowStatesTable';
import { WorkflowTransitionsTable } from './WorkflowTransitionsTable';

/**
 * Renders a card containing a list of group members.
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