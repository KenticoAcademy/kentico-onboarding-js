import { connect } from 'react-redux';
import { EditedListItem as EditedListItemComponent } from '../components/EditedListItem';
import {
  deleteItem,
  toggleEditing,
  updateItemText,
  textUpdateChange,
} from '../actions/actionCreators';

function mapStateToProps(state, { itemId }) {
  return {
    itemText: state.items.byId.get(itemId).text,
    textUpdate: state.items.byId.get(itemId).textUpdate,
  };
}

const mapDispatchToProps = (dispatch, { itemId, updatedText }) => ({
  deleteItem: () => dispatch(deleteItem(itemId)),
  toggleEditing: () => dispatch(toggleEditing(itemId)),
  updateItemText: () => dispatch(updateItemText(itemId, updatedText)),
  textUpdateChange: (text) => dispatch(textUpdateChange(itemId, text)),
});

export const EditedListItem = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);

