import { connect } from 'react-redux';
import { Item as ItemComponent } from '../components/Item';
import {
  editItem,
  deleteItem
} from '../actions/ListActions';

const mapStateToProps = ({ list }, { id, index }) => ({
  index,
  item: list.get(id)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onEditItem: (text) => dispatch(editItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
});

export const Item = connect(mapStateToProps, mapDispatchToProps)(ItemComponent);
