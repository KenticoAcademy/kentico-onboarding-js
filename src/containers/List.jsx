import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import {
  addItem,
  editItem,
  deleteItem
} from '../actions/ListActions';
import { guid } from '../utils/guid';

const mapStateToProps = (state) => ({
  list: state.list,
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) => dispatch(addItem(text)),
  onEditItem: (id, text) => dispatch(editItem(id, text)),
  onDeleteItem: (id) => dispatch(deleteItem(id)),
});

export const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
