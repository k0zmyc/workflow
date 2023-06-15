import { WorkflowStateTableRow } from "./WorkflowStateTableRow.js"
import { useState } from "react";

import ReactModal from 'react-modal';
import { TextInput } from "./TextInput.js";
import { AddButton } from "./AddButton.js";
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

    const openModal = (data) => {
        setModalStateData(data)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalStateData(null)
        setModalIsOpen(false);
    };

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
            <AddButton />
            
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
                <AddButton />

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
                <p><AddButton /></p>
                <button onClick={closeModal} className='btn btn-sm btn-danger'>Close</button>
            </ReactModal>
        </div>
    )
}