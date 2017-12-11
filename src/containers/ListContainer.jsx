import { connect } from 'react-redux';
import { List } from '../components/List';
import {
  addNewItem,
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
  onDeleteItem: (itemId) => dispatch(deleteItem(
    itemId,
  )),
  onAddNewItem: (text) => {
    dispatch(addNewItem(
      text,
    ));
  },
  onCancelItemChanges: (itemId) => dispatch(cancelItemChanges(
    itemId,
  )),
  onOpenItemForEditing: (itemId) => dispatch(openItemForEditing(
    itemId,
  )),
});

const mapStateToProps = state => {
  const items = [];
  state.list.items.forEach(item => items.push(item));

  return {
    items,
  };
};

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
