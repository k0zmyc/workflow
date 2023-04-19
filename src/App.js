import React from 'react';
import './App.css';
import HonzaTable from './components/HonzaTable';
import Table from './components/RayTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HonzaTable />
        <Table />
      </header>
    </div>
  );
}

export default App;
