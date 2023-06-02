import { WorkflowQuery } from '../queries/WorkflowQuery';
import { loadData } from '../reducers/WorkflowSlicer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { WorkflowCard } from '../components/WorkflowCard';



export const WorkflowLoader = () => {
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, setWorkflowLoaderState] = useState([]);

  const fetchData = async () => {
    try {
      const response = await WorkflowQuery();
      const fetchedData = await response.json();
      if (dispatch(loadData(fetchedData.data.workflowPage))) {
        console.log('Dispatch loadData works', fetchedData.data.workflowPage);
        setWorkflowLoaderState(fetchedData.data.workflowPage); // Set the fetched dates to the state
      }
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching group names:', error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-success my-1"
        onClick={fetchData}
        disabled={isDataLoaded}
      >
        {isDataLoaded ? 'Data Loaded' : 'Load Data'}
      </button>

      {/* Mapping workflow array so they have a card each */}
      {data.map((data) => (
        isDataLoaded && <WorkflowCard key = {data.id} data={data} />
      ))}
    </div>
  );
}