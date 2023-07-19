import { useState } from "react";
import { WorkflowStateTablePopupAddUserModalTable } from "./WorkflowStateTablePopupAddUserModalTable.js";

export const WorkflowStateTablePopupAddUser = ({state, actions, wid, setUsersInState}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to handle opening the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
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
                setUsersInState={setUsersInState}
            />
        </div>
        
    )
}