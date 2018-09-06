import { connect } from 'react-redux';
import {
  deleteItem,
  editItem
} from '../actions/actionCreators';
import { EditItem as EditItemComponent } from '../components/EditItem';

const mapStateToProps = (state, { id }) => ({
  text: state.items.get(id).text
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onSave: (text) => dispatch(editItem(id, text)),
  onDelete: () => dispatch(deleteItem(id)),
});

export const EditItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItemComponent);
