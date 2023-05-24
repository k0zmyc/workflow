import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RayTable from './components/RayTable';


// gpt imports
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/reducer';
import TableContainer from './containers/container';

import { PagesDisplayAll } from "./pages/PagesDisplayAll";

import TableShowWorkflow from "./components/TableShowWorkflow";

import { WorkflowPageQuery } from './queries/WorkflowPageQuerie';

import { TableVisibilityButton } from './components/tableVisibilityButton';

// gpt
const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});



function App() {
  console.log("App.js started");
  return(
    <div className="App">
      {/* <h1>Workflow</h1> */}
      {/* <TableShowWorkflow /> */}
      {/* <PagesDisplayAll /> */}
      {/* <RayTable /> */}
      {/* <WorkflowPageQuery /> */}

      <header className="App-header">
        <h1>Workflow</h1>
      </header>
      <div className="container">
        <TableVisibilityButton />
      </div>
    </div>
  );


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>Workflow</h1>
  //     </header>
  //     <div className="container">
  //       <h2>Ray Table</h2>
  //       <RayTable />
  //     </div>
  //   </div>
  // );
}

export default App;
