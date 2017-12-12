import { connect } from 'react-redux';
import { Items as ItemsComponent } from '../components/Items';
import {
  deleteItem,
  cancelItemChanges,
  saveItemChanges,
  openItemForEditing,
} from '../actions';

const mapDispatchToProps = dispatch => ({
  onSaveItemChanges: (itemId, newText) => dispatch(saveItemChanges(
    itemId,
    newText,
  )),
  onDeleteItem: itemId => dispatch(deleteItem(
    itemId,
  )),
  onCancelItemChanges: itemId => dispatch(cancelItemChanges(
    itemId,
  )),
  onOpenItemForEditing: itemId => dispatch(openItemForEditing(
    itemId,
  )),
});

const mapStateToProps = state => {
  const items = state.list.items.valueSeq().toArray();

  return {
    items,
  };
};

export const Items = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsComponent);
