import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HonzaTable from './components/HonzaTable';
import RayTable from './components/RayTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Workflow</h1>
      </header>
      <div className="container">
      <h2>Honza Table</h2>
      <HonzaTable />
      <h2>Ray Table</h2>
      <RayTable />
      </div>
    </div>
  );
}

export default App;
