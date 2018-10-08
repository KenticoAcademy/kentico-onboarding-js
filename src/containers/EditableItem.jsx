import { connect } from 'react-redux';
import { EditableItem } from '../components/EditableItem';

import {
  stopItemEditing,
  deleteItem,
  updateItemText,
} from '../actions';

const mapDispatchToProps = (dispatch, { item }) => ({
  onCancelEdit: () => dispatch(stopItemEditing(item.id)),
  onDeleteItem: () => dispatch(deleteItem(item.id)),
  onUpdateItem: (text) => dispatch(updateItemText(item.id, text)),
});

const ConnectedEditableItem = connect(null, mapDispatchToProps)(EditableItem);
export { ConnectedEditableItem as EditableItem };
