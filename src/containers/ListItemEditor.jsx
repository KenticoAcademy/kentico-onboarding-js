import { connect } from 'react-redux';

import { ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import {
  deleteItem,
  saveItem,
} from '../actions/listActions';
import {
  stopItemEditing,
  changeItemValue,
} from '../actions/itemActions';

const mapStateToProps = (state, { itemValue, bullet }) => ({
  itemValue,
  bullet,
});

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  onCancel: () => dispatch(stopItemEditing(itemKey)),
  onDelete: () => dispatch(deleteItem(itemKey)),
  onSave: (itemValue) => dispatch(saveItem(itemKey, itemValue)),
  onItemValueChange: (itemValue) => dispatch(changeItemValue(itemKey, itemValue)),
});

export const ListItemEditor = connect(mapStateToProps, mapDispatchToProps)(ListItemEditorComponent);
