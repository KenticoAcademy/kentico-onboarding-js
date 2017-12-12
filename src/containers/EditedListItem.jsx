import { connect } from 'react-redux';
import { EditedListItem as EditedListItemComponent } from '../components/EditedListItem';
import {
  deleteItem,
  toggleEditing,
  updateItemText,
  textUpdateChange,
} from '../actions/actionCreators.ts';

function mapStateToProps(state, { itemId }) {
  const item = state.items.byId.get(itemId);
  return {
    itemText: item.text,
    textUpdate: item.textUpdate,
  };
}

const mapDispatchToProps = (dispatch, { itemId, updatedText }) => ({
  onDelete: () => dispatch(deleteItem(itemId)),
  onCancel: () => dispatch(toggleEditing(itemId)),
  onSave: () => dispatch(updateItemText(itemId, updatedText)),
  textUpdateChange: (text) => dispatch(textUpdateChange(itemId, text)),
});

export const EditedListItem = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);

