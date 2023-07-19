import { WorkflowStateTableRow } from "./WorkflowStateTableRow.js"
import { useState } from "react";

import ReactModal from 'react-modal';
import { WorkflowStateTablePopup } from "./WorkflowStateTablePopup.js";


const rootElement = document.getElementById('root');
ReactModal.setAppElement(rootElement);
// By setting the app element, you let react-modal know
// which element in your app represents the main content, 
// so it can manage accessibility properly and prevent 
// screen readers from seeing the main content when the modal is opened.

/**
 * List of members as a table
 * @param {*} param0 
 * @returns 
 */
export const WorkflowStatesTable = ({workflow, actions}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalState, setModalState] = useState(null);
    const [addStateName, setAddStateName] = useState("")

    const openModal = (state) => {
        //console.log("WorkflowStatesTable openModal data: ", data)
        setModalState(state)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalState(null)
        setModalIsOpen(false);
    };

    const addTransitionToState = (transition) => {
        //console.log("addTransitionToState: ", [modalState.nextTransitions, transition])
        setModalState({...modalState, nextTransitions: [...modalState.nextTransitions, transition]})
    }

    const setUsersInState = (users) => {
        //console.log("setUsersInState users: ", users)
        setModalState({...modalState, users: users})
    }

    const setRoleTypesInState = (roleTypes) => {
        console.log("setUsersInState roleTypes: ", roleTypes)
        console.log("setUsersInState modalState: ", modalState)
        setModalState({...modalState, roletypes: roleTypes})
    }

    const addState = () => {
        if (actions.onWorkflowStateUpdate && addStateName) {
            const wid = workflow.id
            const payload = {workflow: {id: wid}, state: {name: addStateName, valid: true}}

            actions.workflowStateAsyncInsert(payload)
                .then(json => console.log("WorkflowStateNameInput: ", json.data.workflowStateInsert.msg))
                .then(() => setAddStateName(""))
                .then(() => {
                    console.log("onChangeAddState: ", payload)
                })
                .then(() => actions.workflowFetch(wid))   // not ideal but better than nothing
        }
    }


    return (
        <div>
            <table className="table table-hover table-stripped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>State name</th>
                        <th>State transitions</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {workflow?.states?.map((state, index) => (
                        <WorkflowStateTableRow 
                            key={state.id} 
                            state={state} 
                            index={index + 1} 
                            actions={actions} 
                            wid={workflow.id}
                            onOpenModal={openModal}
                            setModalRowData={setModalState}
                            setUsersInState={setUsersInState}
                        />
                    ))}
                </tbody>
            </table>

            <input
                className="form-control"
                placeholder={"Add state name"}
                value={addStateName}
                onChange={(e) => setAddStateName(e.target.value)}
            />

            <button className='btn btn-sm btn-success' onClick={addState}>Add state</button>
            
            
            <WorkflowStateTablePopup 
                workflow={workflow}
                actions={actions}
                modalState={modalState}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                addTransitionToState={addTransitionToState}
                setUsersInState={setUsersInState}
                setRoleTypesInState={setRoleTypesInState}
            />
        </div>
    )
}