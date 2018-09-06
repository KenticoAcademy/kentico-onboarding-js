import { connect } from 'react-redux';
import {
  editItem,
  deleteItem
} from '../actions/actionCreators';
import { itemsSelector } from '../selectors/itemsSelector';
import { List } from '../components/List';

const mapStateToProps = (state) => ({
  items: itemsSelector(state.items.valueSeq())
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (id, text) => dispatch(editItem(id, text)),
  onDelete: id => dispatch(deleteItem(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
