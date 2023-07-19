import Workflow from './WorkflowGraph';
import React, { useEffect, useState } from 'react';
import data from './data.json';

function App() {
  const [workflowPage, setWorkflowPage] = useState({});

  useEffect(() => {
    const [firstWorkflowPage] = data.data.workflowPage;
    setWorkflowPage(firstWorkflowPage);
  }, []);

  return (
    <div>
        <h1>Workflow Graph</h1>
      <Workflow workflowPage={workflowPage} />
    </div>
  );
}

export default App;
