import { useSelector } from 'react-redux';
import { WorkflowLoader } from '../actions/WorkflowLoader';


export const MainPage = () => {
    // dddata - change **************************************
    const data = useSelector((state) => state.data);

        return (
            <div className="container">
                <WorkflowLoader />
            </div>
      );
}