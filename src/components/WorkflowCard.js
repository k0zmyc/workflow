import Card from "react-bootstrap/Card";
import { useSelector } from 'react-redux';
import { WorkflowTable } from "./WorkflowTable";
import { WorkflowStatesTable } from "./WorkflowStatesTable";
import { WorkflowTransitionsTable } from "./WorkflowTransitionsTable";



export const WorkflowCard = ({data}) => {
    // Extract the projects state from Redux store using the useSelector hook
    return(
        <div className='container my-2'>
      
            <Card>
                <Card.Title className='p-3 text-start'>{data.name}</Card.Title>
                <Card.Body>
                    {/* <WorkflowTable data={data}/> */}
                    <WorkflowStatesTable states={data.states}/>
                    <WorkflowTransitionsTable transitions={data.transitions}/>
                </Card.Body>
            </Card>
        </div>
    )
}