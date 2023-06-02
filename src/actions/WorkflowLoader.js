import { WorkflowQuery } from '../queries/WorkflowQuery';
import { loadData } from '../reducers/WorkflowSlicer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { WorkflowTable } from '../components/WorkflowTable';



export const WorkflowLoader = () => {
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [dataa, setDates] = useState([]);

  const fetchData = async () => {
    try {
      const response = await WorkflowQuery();
      const data = await response.json();
      if (dispatch(loadData(data.data.workflowPage))) {
        console.log('Dispatch loadData works', data.data.workflowPage);
        setDates(data.data.workflowPage); // Set the fetched dates to the state
      }
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching group names:', error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <button
        className="btn btn-sm btn-success my-1"
        onClick={fetchData}
        disabled={isDataLoaded}
      >
        {isDataLoaded ? 'Data Loaded' : 'Load Data'}
      </button>

      {isDataLoaded && <WorkflowTable dataa={dataa} />}
    </div>
  );
}