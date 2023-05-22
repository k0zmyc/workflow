import React, { useState, useEffect } from 'react';

import workflow_data from './workflow_data.json';

const RayTable = () => {
    const [data1] = useState(workflow_data);
    console.log(data1)
    const [data2] = useState(data1);
    console.log(data2)
    // const [workflowStates] = useState(workflow_data.data.workflowPage.states);
    // const [workflowTransitions] = useState(workflow_data.data.workflowPage.transition);
    return (
        <div>
            <table className="table table-hover table-stripped">
                <thead className="table-dark">
                    <tr>
                        <th>State ID</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>State id</td>
                        <td>state name</td>
                    </tr>
                </tbody>
            </table>


            <table className="table table-hover table-stripped">
                <thead className="table-dark">
                    <tr>
                        <th>Transition ID</th>
                        <th>Transition</th>
                    </tr>
                </thead>
                <tbody>
                     <tr>
                        <td>Transition id</td>
                        <td>Transition name</td>
                    </tr>
                </tbody>



                {/* <tbody>
                    {tableData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    );
}

export default RayTable