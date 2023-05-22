import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';
import TableComponent from '../components/TableComponent';

const mapStateToProps = (state) => ({
  data: state.data,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);