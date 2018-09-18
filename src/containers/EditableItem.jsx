import { connect } from 'react-redux';
import { EditableItem } from '../components/EditableItem';

import {
  cancelEdit,
  deleteItem,
  saveItem,
} from '../actions';

const mapDispatchToProps = (dispatch, { item }) => ({
  onCancelEdit: () => dispatch(cancelEdit(item.id)),
  onDeleteItem: () => dispatch(deleteItem(item.id)),
  onSaveItem: (text) => dispatch(saveItem(item.id, text)),
});

const ConnectedEditableItem = connect(null, mapDispatchToProps)(EditableItem);
export { ConnectedEditableItem as EditableItem };
