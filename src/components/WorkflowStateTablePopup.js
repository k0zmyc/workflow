import ReactModal from 'react-modal';
import { WorkflowStateTablePopupUser } from './WorkflowStateTablePopupUser.js';
import { WorkflowStateTablePopupTransition } from './WorkflowStateTablePopupTransition.js';
import { WorkflowStateTablePopupRoleType } from './WorkflowStateTablePopupRoleType.js';

export const WorkflowStateTablePopup = ({
    workflow, actions, modalState, modalIsOpen, closeModal, addTransitionToState, setUsersInState, setRoleTypesInState}) => {


    //console.log("WorkflowStateTablePopup users: ", modalState?.users)
    return(
        <ReactModal isOpen={modalIsOpen}>
                
                <WorkflowStateTablePopupTransition
                    workflow={workflow}
                    actions={actions}
                    modalState={modalState}
                    addTransitionToState={addTransitionToState}
                />

                <WorkflowStateTablePopupUser
                    workflow={workflow}
                    actions={actions}
                    modalState={modalState}
                    setUsersInState={setUsersInState}
                />

                <WorkflowStateTablePopupRoleType 
                    workflow={workflow}
                    actions={actions}
                    modalState={modalState}
                    setRoleTypesInState={setRoleTypesInState}
                />

                <button onClick={closeModal} className='btn btn-sm btn-danger'>Close</button>
            </ReactModal>
    )
}