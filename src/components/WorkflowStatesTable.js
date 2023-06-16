import { WorkflowStateTableRow } from "./WorkflowStateTableRow.js"
import { useState, useCallback  } from "react";

import ReactModal from 'react-modal';
import { TextInput } from "./TextInput.js";
import { AddStateButton } from "./AddStateButton.js";
import { WorkflowStateTablePopupUserRow } from "./WorkflowStateTablePopupUserRow.js";
import { WorkflowStateTablePopupRoletypeRow } from "./WorkflowStateTablePopupRoletypeRow.js";


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
    //console.log("workflol states in workflowStatesTable: ", workflow)
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalStateData, setModalStateData] = useState(null);
    const [addStateName, setAddStateName] = useState(null)

    const openModal = (data) => {
        setModalStateData(data)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalStateData(null)
        setModalIsOpen(false);
    };

    const onChangeAddState = (value) => {
        setAddStateName(value)
    } 

    const addState = () => {
        if (actions.onWorkflowStateUpdate && addStateName !== "") {
            const wid = workflow.id
            const payload = {workflow: {id: wid}, state: {name: addStateName}}
            console.log("onChangeAddState: ", payload)

            actions.workflowStateAsyncInsert(payload)
                .then(json=>console.log("WorkflowStateNameInput: ", json.data.workflowStateInsert.msg))
                .then(setAddStateName(""))
                .then(() => actions.workflowFetch(wid))   // not ideal but better than nothing
        }
    }

    return (
        <div>
            <table className="table table-hover table-stripped">
                <thead>
                    <tr>
                        <th>#</th>
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
                            openModal={openModal}
                            setModalRowData={setModalStateData}
                        />
                    ))}
                </tbody>
            </table>
            <TextInput placeholder={"Add state"} value="" onChange={onChangeAddState}/>
            <AddStateButton onClick={addState}/>
            
            <ReactModal isOpen={modalIsOpen}>
                <h2>State info: {modalStateData?.name}</h2>
                <h4>Users</h4>
                <table className="table table-hover table-stripped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modalStateData?.users?.map((user, index) => (
                            <WorkflowStateTablePopupUserRow 
                                key={user.id}
                                user={user}
                                index={index + 1}
                                actions={actions}
                                wid={workflow.id}
                            />
                        ))}
                    </tbody>
                </table>

                <h4>Role types</h4>
                <table className="table table-hover table-stripped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modalStateData?.roletypes?.map((roleType, index) => (
                            <WorkflowStateTablePopupRoletypeRow
                                key={roleType.id}
                                roleType={roleType}
                                index={index + 1}
                                actions={actions}
                                wid={workflow.id}
                            />
                        ))}
                    </tbody>
                </table>
                <button onClick={closeModal} className='btn btn-sm btn-danger'>Close</button>
            </ReactModal>
        </div>
    )
}