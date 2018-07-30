import { connect } from 'react-redux';
import { Item as ItemComponent } from '../components/Item';
import {
  saveItem,
  deleteItem,
  toggleItem
} from '../actions/ListActions';

const mapStateToProps = ({ list }, { id }) => ({
  item: list.items.get(id)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onSaveItem: (text) => dispatch(saveItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onToggleItem: () => dispatch(toggleItem(id)),
});

export const Item = connect(mapStateToProps, mapDispatchToProps)(ItemComponent);
