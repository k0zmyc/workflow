import React from 'react'

const RayTable = () => {
    //console.log(group.memberships)
    return (
        <div>
            <table className="table table-hover table-stripped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>State id</td>
                        <td>state name</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default RayTable