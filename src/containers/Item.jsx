import { connect } from 'react-redux';
import { Item as ItemComponent } from '../components/Item';
import {
  saveItem,
  deleteItem,
  toggleItem
} from '../actions/ListActions';

const mapStateToProps = ({ list }, { id, index }) => ({
  index,
  item: list.items.get(id)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onSaveItem: (text) => dispatch(saveItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onCancelEditingItem: () => dispatch(toggleItem(id, false)),
  onActivateItem: () => dispatch(toggleItem(id, true)),
});

export const Item = connect(mapStateToProps, mapDispatchToProps)(ItemComponent);
