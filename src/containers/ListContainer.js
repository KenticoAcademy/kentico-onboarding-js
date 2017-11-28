import {
  deleteItem,
  toggleEditing,
  updateItemText,
} from '../actions/actionCreators';
import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

function mapStateToProps(state) {
  return {
    itemsMap: state.items.byId,
  };
}

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteItem(id)),
  toggleEditing: (id, isBeingEdited) => dispatch(toggleEditing(id, isBeingEdited)),
  updateItemText: (id, newText) => dispatch(updateItemText(id, newText)),
});

export const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

