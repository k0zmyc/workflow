//import { LogButton } from './Button';
//import { PPTable } from './PPTable';

export const TableRow = ({ presence, handleGroupSelection, selectedGroupId }) => (
  <tr key={states.id}>
    <td>{states.name}</td>
    
    {/* <td>
      <LogButton
        onClick={() => handleGroupSelection(presence.user.email)}
        typeofclick={'Vypis'}
      />
    </td>
    <td>{presence.user.email === selectedGroupId && <PPTable presence={presence} />}</td> */}
  </tr>
);