import { connect } from 'react-redux';

import { ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import {
  deleteItem,
  saveItem,
  stopItemEditing,
  changeItemValue,
} from '../actions/actionCreators';

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  cancelItemEditing: () => dispatch(stopItemEditing(itemKey)),
  deleteItem: () => dispatch(deleteItem(itemKey)),
  saveItem: (itemValue) => dispatch(saveItem(itemKey, itemValue)),
  onChange: (itemValue) => dispatch(changeItemValue(itemKey, itemValue)),
});

export const ListItemEditor = connect(null, mapDispatchToProps)(ListItemEditorComponent);
