import { connect } from 'react-redux';
import { EditableItem } from '../components/EditableItem';

import {
  stopItemEditing,
  deleteItem,
  updateItemText,
} from '../actions/index';

const mapStateToProps = ({ todoList: { items } }, { id }) => ({
  item: items.get(id)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onCancelClick: () => dispatch(stopItemEditing(id)),
  onDeleteClick: () => dispatch(deleteItem(id)),
  onSaveClick: (text) => dispatch(updateItemText(id, text)),
});

const ConnectedEditableItem = connect(mapStateToProps, mapDispatchToProps)(EditableItem);
export { ConnectedEditableItem as EditableItem };
