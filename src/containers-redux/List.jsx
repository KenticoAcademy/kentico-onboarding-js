import { connect } from 'react-redux';
import { List } from '../components/List';

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
});

export const ListContainer = connect(
  mapStateToProps,
  null
)(List);