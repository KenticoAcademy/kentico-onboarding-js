import { connect } from 'react-redux';
import { List } from './List';
import {
  addNewItem,
  changeItemText,
  deleteItem,
  selectItemText,
  cancelItemChanges,
} from '../actionCreators';

const mapDispatchToProps = dispatch => {
  return {
    onChangeItemText: (itemId, newText) => dispatch(changeItemText({
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
    onCancelUnsavedChanges: (itemId) => dispatch(cancelItemChanges({
      itemId,
    })),
    onOpenItemForEditing: (itemId, selectionRangeStarts, selectionRangeEnds) => dispatch(selectItemText({
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
