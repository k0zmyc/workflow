import { useState } from "react";
import { TextInput } from "./TextInput.js";

export const WorkflowStateTablePopupAddTransition = ({state, actions, wid}) => {

    // logs everytime I change transition name - does the component refresh? don't understand...
    //console.log("WorkflowStateTablePopupAddTransition: ", state)

    const [transition, setTransition] = useState({name: "", sourceId: state?.id, destinationId: ""})

    const addTransitionName = (value) => {
        setTransition({...transition, name: value})
    }

    const addTransitionDestinationId = (value) => {
        setTransition({...transition, destinationId: value})
    }

    const addTransition = () => {
        if (actions.onWorkflowStateUpdate) {
            console.log("addTransition: ", transition)
            const payload = {
                workflow: {id: wid}, 
                transition: {
                    name: transition.name, 
                    source: {id: transition.sourceId}, 
                    destination: {id: transition.destinationId
            }}}

            console.log("addTransition: ", payload)

            actions.workflowTransitionAsyncInsert(payload)
                .then(json=>console.log("workflowStateAsyncInsert: ", json.data.workflowTransitionInsert.msg))
                .then(() => actions.workflowFetch(wid))   // not ideal but better than nothing
        }
    }





    return(
        <table className="table table-hover table-stripped">
            <tbody>
                <tr>
                    <th><TextInput placeholder={"Add transition name"} value={transition.name} onChange={addTransitionName} /></th>
                    <th><TextInput placeholder={"Add destination state ID"} value={transition.destinationId} onChange={addTransitionDestinationId} /></th>
                    <th><button className='btn btn-sm btn-success' onClick={addTransition} >Add state</button></th>
                </tr> 
            </tbody>
        </table>
        
    )
}


{/* <th><TextInput placeholder={"Add state name"} value={addStateName} onChange={onChangeAddStateName}/></th>
<th><button className='btn btn-sm btn-success' onClick={addState}>Add state</button></th> */}