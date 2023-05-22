import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HonzaTable from './components/HonzaTable';
import RayTable from './components/RayTable';


// gpt imports
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/reducer';
import TableContainer from './containers/container';

// gpt
const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});



function App() {
  console.log("Hello");
  return(
    <Provider store={store}>
      <TableContainer />
    </Provider>
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
