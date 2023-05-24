import { useState } from "react";
import HonzaTable from "./HonzaTable"

export const TableVisibilityButton = () => {
const [visibility, changeVisibility] = useState(false)

if (visibility) {
    return (
        <div>
            <button className="btn btn-primary" onClick={() => changeVisibility(false)}>Skryt tabulku</button>
            <HonzaTable/>
        </div>
    )
}
else
    return (<button className="btn btn-primary" onClick={() => changeVisibility(true)}>Zobraz tabulku</button>)
}