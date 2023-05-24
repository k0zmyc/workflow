import React, {Component} from 'react'



class TableShowWorkflow extends Component {
    constructor({data}) {
        console.log("TableShowWorkflowTest called")
      super();
      this.state = {
        states: data.data.workflowPage[0].states,
        transitions: data.data.workflowPage[0].transitions,
      };
    }


  
    render() {
      return (
        <div>
          <h2>Stavy</h2>
          <table className="table table-hover table-stripped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last Change</th>
                <th>Next Transitions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.states.map((state) => (
                <tr key={state.id}>
                <td>{state.id}</td>
                  <td>{state.name}</td> {/* Assuming 'state.name' is an object with an 'id' property */}
                  <td>{state.lastchange}</td>
                  <td>{state.nextTransitions.map((nextTransition) => <>{nextTransition.name} </>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Tranzice</h2>
          <table className="table table-hover table-stripped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last Change</th>
                <th>Source</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transitions.map((transition) => (
                <tr key={transition.id}>
                <td>{transition.id}</td>
                  <td>{transition.name}</td>
                  <td>{transition.lastchange}</td>
                  <td>{transition.source.name}</td>
                  <td>{transition.destination.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

export default TableShowWorkflow
