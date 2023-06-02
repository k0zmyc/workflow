export const WorkflowTransitionsTableRow = ({ transition }) => {
    const { id, name, lastchange, source, destination } = transition;
  
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{lastchange}</td>
        <td>{source.name}</td>
        <td>{destination.name}</td>
      </tr>
    );
  };