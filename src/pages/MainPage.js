import { useSelector } from 'react-redux';
import { WorkflowLoader } from '../actions/WorkflowLoader';




export const MainPage = () => {
    // dddata - change **************************************
    const dddata = useSelector((state) => state.dddata);

        return (
            <div className="container">
                <WorkflowLoader />
            </div>
      );
}