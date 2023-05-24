import { useSelector } from 'react-redux';

function HonzaTable() {
const tableData = useSelector((state) => state.workflows.states)

  return (
      <div>
        <table className="table table-hover table-stripped">
          <thead className='table-dark'>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
            }

export default HonzaTable;
