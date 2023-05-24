import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableVisibilityButton } from './components/tableVisibilityButton';
import { TableVisibilityButton2 } from './components/tableVisibilityButton2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Workflow</h1>
      </header>
      <div className="container">
        <TableVisibilityButton />
        <TableVisibilityButton2 />
      </div>
    </div>
  );
}

export default App;
