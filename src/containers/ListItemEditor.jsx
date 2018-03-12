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

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  cancelItemEditing: () => dispatch(stopItemEditing(itemKey)),
  deleteItem: () => dispatch(deleteItem(itemKey)),
  saveItem: (itemValue) => dispatch(saveItem(itemKey, itemValue)),
  onChange: (itemValue) => dispatch(changeItemValue(itemKey, itemValue)),
});

export const ListItemEditor = connect(null, mapDispatchToProps)(ListItemEditorComponent);
