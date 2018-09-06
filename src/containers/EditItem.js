import { connect } from 'react-redux';
import {
  deleteItem,
  editItem
} from '../actions/actionCreators';
import { EditItem as EditItemComponent } from '../components/EditItem';

const mapDispatchToProps = (dispatch, { item }) => ({
  onSave: (text) => dispatch(editItem(item.id, text)),
  onDelete: () => dispatch(deleteItem(item.id)),
});

export const EditItem = connect(
  null,
  mapDispatchToProps
)(EditItemComponent);
