import { useState } from "react";
import { WorkflowStateTablePopupAddUserModalTable } from "./WorkflowStateTablePopupAddUserModalTable.js";

export const WorkflowStateTablePopupAddUser = ({state, actions, wid}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to handle opening the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const closeModal = () => {
        //actions.workflowFetch(wid)  // update page after change - not ideal but better than nothing
        setIsModalOpen(false);
    };


    const [modalData, setModalData] = useState({});

    // Function to handle updating the modal data
    const updateModalData = (data) => {
        setModalData(data);
    };


    return(
        <div>
            <table className="table table-hover table-stripped">
                <tbody>
                    <tr>
                        <th><button className='btn btn-sm btn-success' onClick={openModal}>Add a user</button></th>                    
                    </tr> 
                </tbody>
            </table>

            <WorkflowStateTablePopupAddUserModalTable 
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                state={state} 
                actions={actions} 
                wid={wid}
            />

        </div>
        
    )
}