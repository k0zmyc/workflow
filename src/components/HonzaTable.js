import React, { useState } from 'react';

import data from './mock_data.json';

function HonzaTable() {
  const [tableData] = useState(data);

  return (
      <div>
        <table className="table table-hover table-stripped">
          <thead className='table-dark'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
            }

export default HonzaTable;
