import { WorkflowStateTableRow } from "./WorkflowStateTableRow.js"
import { useState, useCallback  } from "react";

import ReactModal from 'react-modal';
import { TextInput } from "./TextInput.js";
import { WorkflowStateTablePopupUserRow } from "./WorkflowStateTablePopupUserRow.js";
import { WorkflowStateTablePopupRoletypeRow } from "./WorkflowStateTablePopupRoletypeRow.js";
import { WorkflowStateTablePopupTransitionRow } from "./WorkflowStateTablePopupTransitionRow.js";
import { WorkflowStateTablePopupAddTransition } from "./WorkflowStateTablePopupAddTransition.js";
import { DropDown } from "./DropDown.js";


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
    const [modalStateData, setModalStateData] = useState(null);
    const [addStateName, setAddStateName] = useState("")
    const [addStateTransition, setAddStateTransition] = useState(undefined)

    const openModal = (data) => {
        setModalStateData(data)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalStateData(null)
        setModalIsOpen(false);
    };

    const onChangeAddStateName = (value) => {
        setAddStateName(value)
    }

    const onChangeAddStateTransition = (value) => {
        console.log("onChangeAddStateTransition: ", value)
        setAddStateTransition(value)
    }

    const addState = () => {
        if (actions.onWorkflowStateUpdate && addStateName) {
            const wid = workflow.id
            const payload = {workflow: {id: wid}, state: {name: addStateName}}
            

            actions.workflowStateAsyncInsert(payload)
                .then(json => console.log("WorkflowStateNameInput: ", json.data.workflowStateInsert.msg))
                .then(() => setAddStateName(""))
                .then(() => {
                    console.log("onChangeAddState: ", payload, addStateTransition)
                    //actions.workflowStateAsyncInsert(payload)
                })
                .then(() => actions.workflowFetch(wid))   // not ideal but better than nothing
        }
    }

    const addTransition = (value) => {
        console.log("addTransition: ", value)
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
                            openModal={openModal}
                            setModalRowData={setModalStateData}
                        />
                    ))}
                </tbody>
            </table>

            <TextInput placeholder={"Add state name"} value={addStateName} onChange={onChangeAddStateName}/>
            <button className='btn btn-sm btn-success' onClick={addState}>Add state</button>
            
            
            {/*separate component*/}
            <ReactModal isOpen={modalIsOpen}>
                
                <h2>State data: {modalStateData?.name}</h2>
                <h4>Transitions</h4>
                <table className="table table-hover table-stripped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modalStateData?.nextTransitions?.map((transition, index) => (
                            <WorkflowStateTablePopupTransitionRow 
                                key={transition.id}
                                transition={transition}
                                index={index + 1}
                                actions={actions}
                                wid={workflow.id}
                            />
                        ))}
                    </tbody>
                </table>

                <WorkflowStateTablePopupAddTransition state={modalStateData} actions={actions} wid={workflow.id}/>


                
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