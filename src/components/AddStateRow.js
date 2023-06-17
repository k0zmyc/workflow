import { TextInput } from "./TextInput.js";
import { AddStateButton } from "./AddStateButton.js";
import { DropDown } from "./DropDown.js";

export const AddStateRow = ({stateName, stateTransition, onChange, onClick}) => {



    return(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextInput placeholder={"Add state name"} value={stateName} onChange={onChange}/>
            <DropDown />

            <AddStateButton onClick={onClick}/>
            

            {/* 
                <TextInput placeholder={"Add state"} value={addStateName} onChange={onChangeAddState}/>
                <AddStateButton onClick={addState} /> 
            */}
        </div>
        
    )
}