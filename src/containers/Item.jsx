import { connect } from 'react-redux';
import { Item as ItemComponent } from '../components/Item';
import {
  editItem,
  deleteItem
} from '../actions/ListActions';

const mapDispatchToProps = (dispatch) => ({
  onEditItem: (id, text) => dispatch(editItem(id, text)),
  onDeleteItem: (id) => dispatch(deleteItem(id)),
});

export const Item = connect(null, mapDispatchToProps)(ItemComponent);
