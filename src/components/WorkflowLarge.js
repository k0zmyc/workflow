import Card from "react-bootstrap/Card";

//import { WorkflowMembersCard } from './WorkflowMembersCard';
//import { GroupSubgroupsCard } from "./GroupSubgroupsCard";
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
                {/* <WorkflowMembersCard workflow={workflow} actions={actions} /> */}
                {/* <GroupSubgroupsCard workflow={workflow} actions={actions} /> */}
            </Card.Body>
            <Card.Body>
                {JSON.stringify(workflow)}
            </Card.Body>
        </Card>
    )
}