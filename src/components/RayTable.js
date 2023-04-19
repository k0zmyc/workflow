import React from 'react'

const Table = () => {
    //console.log(group.memberships)
    return (
        <div>
            <table className="table table-hover table-stripped">
                <thead>
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

export default Table