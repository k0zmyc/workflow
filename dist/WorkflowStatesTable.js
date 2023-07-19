import { WorkflowStateTableRow } from "./WorkflowStateTableRow.js";
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
 * Renders a table of states in the workflow with options to add new states and view details in a popup modal.
 *
 * @param {Object} param0 - Props for the WorkflowStatesTable component.
 * @param {Object} param0.workflow - The workflow object containing information about the workflow.
 * @param {Object} param0.actions - The actions object providing functions to interact with the workflow.
 * @returns {JSX.Element} - The JSX element representing the WorkflowStatesTable component.
 */
export const WorkflowStatesTable = ({
  workflow,
  actions
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [addStateName, setAddStateName] = useState("");
  const openModal = state => {
    //console.log("WorkflowStatesTable openModal data: ", data)
    setModalState(state);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalState(null);
    setModalIsOpen(false);
  };
  const addTransitionToState = transition => {
    //console.log("addTransitionToState: ", [modalState.nextTransitions, transition])
    setModalState({
      ...modalState,
      nextTransitions: [...modalState.nextTransitions, transition]
    });
  };
  const setUsersInState = users => {
    //console.log("setUsersInState users: ", users)
    setModalState({
      ...modalState,
      users: users
    });
  };
  const setRoleTypesInState = roleTypes => {
    //console.log("setUsersInState roleTypes: ", roleTypes)
    setModalState({
      ...modalState,
      roletypes: roleTypes
    });
  };
  const addState = () => {
    if (actions.onWorkflowStateUpdate && addStateName) {
      const wid = workflow.id;
      const payload = {
        workflow: {
          id: wid
        },
        state: {
          name: addStateName,
          valid: true
        }
      };
      actions.workflowStateAsyncInsert(payload).then(json => console.log("WorkflowStateNameInput: ", json.data.workflowStateInsert.msg)).then(() => setAddStateName("")).then(() => {
        console.log("onChangeAddState: ", payload);
      }).then(() => actions.workflowFetch(wid)); // not ideal but better than nothing
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "State name"), /*#__PURE__*/React.createElement("th", null, "State transitions"), /*#__PURE__*/React.createElement("th", null, "Options"))), /*#__PURE__*/React.createElement("tbody", null, workflow?.states?.map((state, index) => /*#__PURE__*/React.createElement(WorkflowStateTableRow, {
    key: state.id,
    state: state,
    index: index + 1,
    actions: actions,
    wid: workflow.id,
    onOpenModal: openModal,
    setModalRowData: setModalState,
    setUsersInState: setUsersInState
  })))), /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    placeholder: "Add state name",
    value: addStateName,
    onChange: e => setAddStateName(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: addState
  }, "Add state"), /*#__PURE__*/React.createElement(WorkflowStateTablePopup, {
    workflow: workflow,
    actions: actions,
    modalState: modalState,
    modalIsOpen: modalIsOpen,
    closeModal: closeModal,
    addTransitionToState: addTransitionToState,
    setUsersInState: setUsersInState,
    setRoleTypesInState: setRoleTypesInState
  }));
};