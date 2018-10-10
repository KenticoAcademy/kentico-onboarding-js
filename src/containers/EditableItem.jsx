import { connect } from 'react-redux';
import { EditableItem } from '../components/EditableItem';

import {
  stopItemEditing,
  deleteItem,
  updateItemText,
} from '../actions';

const mapStateToProps = ({ todoListReducer: { items } }, { id }) => ({
  item: items.get(id)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onCancelEdit: () => dispatch(stopItemEditing(id)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onUpdateItem: (text) => dispatch(updateItemText(id, text)),
});

const ConnectedEditableItem = connect(mapStateToProps, mapDispatchToProps)(EditableItem);
export { ConnectedEditableItem as EditableItem };
