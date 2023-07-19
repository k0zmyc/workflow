import Card from "react-bootstrap/Card";
import { WorkflowTransitionsTable } from './WorkflowTransitionsTable';

/**
 * Renders a card containing a list of group members.
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