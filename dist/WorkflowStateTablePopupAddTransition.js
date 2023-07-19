import { useState } from "react";
export const WorkflowStateTablePopupAddTransition = ({
  state,
  actions,
  wid,
  addTransitionToState
}) => {
  const [transition, setTransition] = useState({
    name: "",
    sourceId: state?.id,
    destinationId: ""
  });
  const addTransitionName = value => {
    setTransition({
      ...transition,
      name: value
    });
  };
  const addTransitionDestinationId = value => {
    setTransition({
      ...transition,
      destinationId: value
    });
  };
  const addTransition = () => {
    if (actions.onWorkflowStateUpdate && transition.name != "" && transition.destinationId != "") {
      //console.log("addTransition transition: ", transition)
      const payload = {
        workflow: {
          id: wid
        },
        transition: {
          name: transition.name,
          source: {
            id: transition.sourceId
          },
          destination: {
            id: transition.destinationId
          }
        }
      };
      actions.workflowTransitionAsyncInsert(payload).then(json => {
        console.log("workflowStateAsyncInsert: ", json.data.workflowTransitionInsert.msg);
        const transitionToState = json.data.workflowTransitionInsert.transition;
        if (json.data.workflowTransitionInsert.msg === "ok") addTransitionToState(transitionToState); // if message ok add transition
      }).then(() => {
        actions.workflowFetch(wid); // not ideal but better than nothing
        setTransition({
          name: "",
          sourceId: state?.id,
          destinationId: ""
        });
      });
    }
  };
  return /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-stripped"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    placeholder: "Add transition name",
    value: transition.name,
    onChange: e => addTransitionName(e.target.value)
  })), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    placeholder: "Add destination ID",
    value: transition.destinationId,
    onChange: e => addTransitionDestinationId(e.target.value)
  })), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: addTransition
  }, "Add transition")))));
};