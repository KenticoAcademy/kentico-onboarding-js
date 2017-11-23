import {
  deleteItem,
  toggleEditing,
  updateItemText,
} from '../utils/actionCreators';
import { connect } from 'react-redux';
import { List } from '../components/List';

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteItem(id)),
  toggleEditing: (id, isBeingEdited) => dispatch(toggleEditing(id, isBeingEdited)),
  updateItemText: (id, newText) => dispatch(updateItemText(id, newText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

