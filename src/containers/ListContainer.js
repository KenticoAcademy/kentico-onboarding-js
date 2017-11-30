import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import {
  deleteItem,
  toggleEditing,
  updateItemText,
} from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    itemsMap: state.items.byId,
  };
}

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteItem(id)),
  toggleEditing: (id) => dispatch(toggleEditing(id)),
  updateItemText: (id, newText) => dispatch(updateItemText(id, newText)),
});

export const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

