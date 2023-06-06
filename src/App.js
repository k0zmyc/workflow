import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { WorkflowPageProvider } from './pages/WorkflowPageProvider';
import { AppProvider } from './pages/AppProvider';

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
