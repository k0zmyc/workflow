export const WorkflowStatesTableRow = ({ state }) => {
    const { id, name, lastchange, nextTransitions } = state;
  
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{lastchange}</td>
        <td>
            {nextTransitions.map((transition) => (
                <span key={transition.id}>{transition.name} </span>
            ))}
        </td>
      </tr>
    );
  };