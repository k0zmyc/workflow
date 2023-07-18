import ReactModal from 'react-modal';
import { WorkflowStateTablePopupUserRow } from "./WorkflowStateTablePopupUserRow.js";
import { WorkflowStateTablePopupRoleTypeRow } from "./WorkflowStateTablePopupRoletypeRow.js";
import { WorkflowStateTablePopupTransitionRow } from "./WorkflowStateTablePopupTransitionRow.js";
import { WorkflowStateTablePopupAddTransition } from "./WorkflowStateTablePopupAddTransition.js";
import { WorkflowStateTablePopupAddUser } from "./WorkflowStateTablePopupAddUser.js";
import { WorkflowStateTablePopupAddRoleType } from "./WorkflowStateTablePopupAddRoleType.js";

export const WorkflowStateTablePopup = ({workflow, actions, modalStateData, modalIsOpen, closeModal}) => {

    return(
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
                            <th>Options</th>
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
                                stateId={modalStateData.id}
                            />
                        ))}
                    </tbody>
                </table>

                <WorkflowStateTablePopupAddUser state={modalStateData} actions={actions} wid={workflow.id}/>

                <h4>Role types</h4>
                <table className="table table-hover table-stripped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modalStateData?.roletypes?.map((roleType, index) => (
                            <WorkflowStateTablePopupRoleTypeRow
                                key={roleType.id}
                                roleType={roleType}
                                index={index + 1}
                                actions={actions}
                                wid={workflow.id}
                                stateId={modalStateData.id}
                            />
                        ))}
                    </tbody>
                </table>

                <WorkflowStateTablePopupAddRoleType state={modalStateData} actions={actions} wid={workflow.id}/>

                <button onClick={closeModal} className='btn btn-sm btn-danger'>Close</button>
            </ReactModal>
    )
}