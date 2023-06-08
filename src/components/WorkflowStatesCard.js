import Card from "react-bootstrap/Card";

import { WorkflowStatesTable } from './WorkflowStatesTable';
import {SaveButton} from './SaveButton'

/**
 * Renders a card containing a list of group members.
 */
export const WorkflowStatesCard = ({workflow, actions}) => {
    
    //save button action
    const onclick = () => {
        //const payload = {workflow: {id: wid}, state: state}
        //console.log("State onclick: ")
        //console.log(state.nextTransitions)
        //actions.workflowAsyncUpdate({...workflow, name: value})
        //    .then(json=>console.log("WorkflowNameInput", json.data.workflowUpdate.msg))
    }
    
    
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    States
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <WorkflowStatesTable workflow={workflow} actions={actions}/>
                <SaveButton onClick={onclick}>Save</SaveButton>
            </Card.Body>
        </Card>
    )
}