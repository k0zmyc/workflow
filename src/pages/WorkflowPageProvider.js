import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { WorkflowLarge } from '../components/WorkflowLarge';

import { actions } from './AppProvider';

/**
 * Komponenta, ktera je zaclenena ve strukture s Providerem, tedy se store, importuje si akce a poskytuje je podrizenym komponentam
 * @param {*} param0 
 * @returns 
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