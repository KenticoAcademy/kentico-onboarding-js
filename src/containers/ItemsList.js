import { connect } from 'react-redux';
import {
  itemEdited,
  itemDeleted
} from '../actions/actionCreators';
import { List } from '../components/List';

const mapStateToProps = (state) => ({
  items: state.items.valueSeq()
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (id, text) => dispatch(itemEdited(id, text)),
  onDelete: id => dispatch(itemDeleted(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
