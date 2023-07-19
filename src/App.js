/**
 * Main App component
 * @module App
 */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WorkflowPageProvider } from './pages/WorkflowPageProvider';
import { AppProvider } from './pages/AppProvider';


/**
 * The root component of the application.
 * @function App
 * @returns {JSX.Element} JSX element representing the main App component.
 */
function App() {
  return (
    <div className="App">
      
      <AppProvider>
        <WorkflowPageProvider id="8299eeeb-99e7-4364-8cc2-88b83f900d32" />
      </AppProvider>
    </div>
  );
}

export default App;
