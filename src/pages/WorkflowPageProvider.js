import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { WorkflowLarge } from '../components/WorkflowLarge';
import { actions } from './AppProvider';

/**
 * A component that is integrated into the structure with a Provider, thus having access to the store.
 * It imports actions and provides them to its child components.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the workflow page to display.
 * @returns {JSX.Element} - JSX element representing the WorkflowPageProvider component.
 */
export const WorkflowPageProvider = ({id}) => {

    //vyber vsech skupin ze store
    const workflows = useSelector(state => state.workflows)

    //vyber idcka u skupiny, ktere bylo vybrano
    const selectedId = useSelector(state => state.workflows.selectedId)
    
    //vyber skupiny ze store, ktera ma byt zobrazena
    const workflow = workflows[id] //|| {id: id}

    //console.log(group)
    console.log('prekresleni')
    /*
    if (workflow?.states) {
        console.log(workflow.states)
    }
    */

    useEffect(
        () => {
            console.log('WorkflowPageProvider refetch ' + id)
            actions.workflowFetch(id)
        }, [id, selectedId]
    )

    //console.log("Worklow: ", workflow)

    if (workflow) {
        //skupina je ve store
        return (
            <WorkflowLarge workflow={workflow} actions={actions}/>
        )
    } else {
        //skupina ve store neni
        return (
            <div>Loading... {id} {workflow}</div>
        )
    }
}