import { Trash, Info } from 'react-bootstrap-icons';
import { TextInput } from './TextInput';
import { DeleteButton } from './DeleteButton';

/**
 * One member as a table row
 * @param {*} param0 
 * @returns 
 */

export const WorkflowStateTableRow = ({
  index,
  state,
  actions,
  wid,
  onOpenModal
}) => {
  //delete button action - disvalidate state
  const onDeleteButtonClick = () => {
    if (actions.onWorkflowStateUpdate) {
      console.log("onDeleteButtonOnClick: ", state);
      const payload = {
        workflow: {
          id: wid
        },
        state: {
          ...state,
          valid: false
        }
      };

      // Create an array of promises for all updates to rerender all at the end
      const updatePromises = [actions.workflowStateAsyncUpdate(payload).then(json => console.log("WorkflowStateAsyncUpdate onDeleteButtonOnClick: ", json.data.workflowStateUpdate.msg))];

      // disvalidating all transitions to and from this state
      state.nextTransitions?.map(nextTransition => {
        //console.log("Disvalidating transition: ", nextTransition)
        const payload = {
          workflow: {
            id: wid
          },
          transition: {
            ...nextTransition,
            valid: false
          }
        };
        updatePromises.push(actions.workflowTransitionAsyncUpdate(payload));
      });
      state.previousTransitions?.map(previousTransition => {
        //console.log("Disvalidating transition: ", previousTransition)
        const payload = {
          workflow: {
            id: wid
          },
          transition: {
            ...previousTransition,
            valid: false
          }
        };
        updatePromises.push(actions.workflowTransitionAsyncUpdate(payload));
      });

      // wait for all promises to resolve and then rerender
      Promise.all(updatePromises).then(() => actions.workflowFetch(wid)).catch(error => console.error("Error updating state and transitions:", error));
    }
  };

  //info button action
  const onInfoButtonClick = () => {
    onOpenModal(state);
  };

  //change state name callback
  const onChangeStateName = value => {
    if (actions.onWorkflowStateUpdate) {
      //console.log("onChangeName state value: ", state, value)
      const payload = {
        workflow: {
          id: wid
        },
        state: {
          ...state,
          name: value,
          valid: true
        }
      };
      actions.workflowStateAsyncUpdate(payload).then(json => console.log("WorkflowStateNameInput: ", json.data.workflowStateUpdate.msg)).then(() => actions.workflowFetch(wid)); // update page after change - not ideal but better than nothing
    }
  };

  // creating list of valid transitions (valid === true || valid == null)
  const validTransitions = state?.nextTransitions?.filter(transition => transition.valid !== false);

  // when should I not include a state in the table?
  if (state.valid === false) {
    return;
  }
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, index, ": "), /*#__PURE__*/React.createElement("td", null, state?.id), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "name",
    id: wid,
    value: state.name,
    onChange: onChangeStateName
  })), /*#__PURE__*/React.createElement("td", null, validTransitions?.map(transition => /*#__PURE__*/React.createElement("div", {
    key: transition.id
  }, transition?.name))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DeleteButton, {
    onClick: onDeleteButtonClick
  }, /*#__PURE__*/React.createElement(Trash, null)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-info",
    onClick: onInfoButtonClick
  }, /*#__PURE__*/React.createElement(Info, null))));
};