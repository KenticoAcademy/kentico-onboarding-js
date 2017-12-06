import { connect } from 'react-redux';
import { List } from '../components/List';
import {
  addNewItem,
  deleteItem,
  cancelItemChanges,
  saveItemChanges,
  openItemForEditing,
} from '../actionCreators';

const mapDispatchToProps = dispatch => {
  return {
    onSaveItemChanges: (itemId, newText) => dispatch(saveItemChanges({
      itemId,
      newText,
    })),
    onDeleteItem: (itemId) => dispatch(deleteItem({
      itemId,
    })),
    onAddNewItem: (itemId, text) => {
      dispatch(addNewItem({
        itemId,
        text,
      }));
    },
    onCancelItemChanges: (itemId) => dispatch(cancelItemChanges({
      itemId,
    })),
    onOpenItemForEditing: (itemId, selectionRangeStarts, selectionRangeEnds) => dispatch(openItemForEditing({
      itemId,
      selectionRangeStarts,
      selectionRangeEnds,
    })),
  };
};

const mapStateToProps = state => {
  const items = [];
  state.forEach(item => items.push(item));

  return {
    items,
  };
};

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
