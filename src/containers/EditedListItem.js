import { connect } from 'react-redux';
import { EditedListItem as EditedListItemComponent } from '../components/EditedListItem';
import {
  deleteItem,
  toggleEditing,
  updateItemText,
} from '../actions/actionCreators';

function mapStateToProps(state, { itemId }) {
  return {
    itemText: state.items.byId.get(itemId).text,
  };
}

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteItem(id)),
  toggleEditing: (id) => dispatch(toggleEditing(id)),
  updateItemText: (id, newText) => dispatch(updateItemText(id, newText)),
});

export const EditedListItem = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);

