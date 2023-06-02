import { useState } from 'react';
import { WorkflowTransitionsTableRow } from './WorkflowTransitionsTableRow'
//import { TableRow } from './TableRow';
// import { EventsTextBox } from '../comp/EventsTextbox';
// import {  EventsUpdater } from '../actions/EventsMutationLoader';

export const WorkflowTransitionsTable = ({ transitions }) => {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
  
    const handleGroupSelection = (groupId) => {
      setSelectedGroupId(groupId);
    };

    const event = {
      id: "45b2df80-ae0f-11ed-9bd8-0242ac110002",
      lastchange: "2023-05-22T07:41:27.417197",
      name: "Test"
    }

    return (
        <div>
          <h5>Transitions</h5>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last change</th>
                <th>Source</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              {transitions.map((transition) => (
                <WorkflowTransitionsTableRow key={transition.id} transition={transition} />
              ))}
            </tbody>
          </table>
        </div>
      );
  };