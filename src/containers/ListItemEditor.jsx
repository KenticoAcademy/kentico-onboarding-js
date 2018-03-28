import { connect } from 'react-redux';

import { ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import {
  deleteItem,
  saveItem,
  stopItemEditing,
  changeItemValue,
} from '../actions';

const mapDispatchToProps = (dispatch, { item: { key } }) => ({
  onCancelEdit: () => dispatch(stopItemEditing(key)),
  deleteItem: () => dispatch(deleteItem(key)),
  saveItem: () => dispatch(saveItem(key)),
  onChange: (itemValue) => dispatch(changeItemValue(key, itemValue)),
});

export const ListItemEditor = connect(null, mapDispatchToProps)(ListItemEditorComponent);
