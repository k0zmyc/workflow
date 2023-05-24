import { useState } from "react";
import { useSelector } from 'react-redux';
import RayTable from "./RayTable"

export const TableVisibilityButton = () => {
const [visibility, changeVisibility] = useState(false)
const data = useSelector((state) => state.workflows)

if (visibility) {
    return (
        <div>
            <button className="btn btn-primary" onClick={() => changeVisibility(false)}>Skryt tabulku</button>
            <RayTable data={data}/>
        </div>
    )
}
else
    return (<button className="btn btn-primary" onClick={() => changeVisibility(true)}>Zobraz 1. tabulku</button>)
}