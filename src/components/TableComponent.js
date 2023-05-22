import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions.js';

const TableComponent = ({ data, error, fetchData }) => {
  useEffect(() => {
    fetchData(); // Fetch the data when the component mounts
  }, [fetchData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const workflowPage = data.workflowPage[0];
  const transitions = workflowPage.transitions;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Last Change</th>
          <th>Source</th>
          <th>Destination</th>
        </tr>
      </thead>
      <tbody>
        {transitions.map((transition) => (
          <tr key={transition.id}>
            <td>{transition.id}</td>
            <td>{transition.name}</td>
            <td>{transition.lastchange}</td>
            <td>{transition.source.name}</td>
            <td>{transition.destination.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    error: state.error,
  };
};

export default connect(mapStateToProps, { fetchData })(TableComponent);