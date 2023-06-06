import { TextInput } from './TextInput';

export const WorkflowNameInput = ({workflow, actions}) => {
    const onchange = (value) => {
        console.log("changed", value)

        actions.workflowAsyncUpdate({...workflow, name: value})
            .then(json=>console.log("WorkflowNameInput", json.data.workflowUpdate.msg))
    }
    return (
        <TextInput id={workflow.id} value={workflow.name} placeholder={"název skupiny ********** zmenit v WorkflowNameInput ************"} onChange={onchange}/>
    )
}