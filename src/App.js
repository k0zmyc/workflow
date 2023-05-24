import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableVisibilityButton } from './components/tableVisibilityButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Workflow</h1>
      </header>
      <div className="container">
        <TableVisibilityButton />
      </div>
    </div>
  );
}

export default App;
