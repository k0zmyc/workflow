import React, { useState } from 'react';

import data from './mock_data.json';

function HonzaTable() {
  const [tableData] = useState(data);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Simple Table</h1>
      </header>
      <main>
        <table>
          <thead>
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
      </main>
    </div>
  );
}

export default HonzaTable;
