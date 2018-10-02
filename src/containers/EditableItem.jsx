import { connect } from 'react-redux';
import { EditableItem } from '../components/EditableItem';

import {
  stopEditing,
  deleteItem,
  updateText,
} from '../actions';

const mapDispatchToProps = (dispatch, { item }) => ({
  onCancelEdit: () => dispatch(stopEditing(item.id)),
  onDeleteItem: () => dispatch(deleteItem(item.id)),
  onUpdateItem: (text) => dispatch(updateText(item.id, text)),
});

const ConnectedEditableItem = connect(null, mapDispatchToProps)(EditableItem);
export { ConnectedEditableItem as EditableItem };
