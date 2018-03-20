import { connect } from 'react-redux';

import { ListGroupActions as ListGroupActionsComponent } from '../components/ListGroupActions';
import {
  saveItem,
  deleteItem,
  stopItemEditing,
} from '../actions/actionCreators';

const mapStateToProps = (state, { editedItems }) => ({
  isGroupVisible: editedItems.length > 1,
});

const mapDispatchToProps = (dispatch, { editedItems }) => ({
  saveAll: () => editedItems.forEach(item => dispatch(saveItem(item.key, item.temporaryValue))),
  cancelAll: () => editedItems.forEach(item => dispatch(stopItemEditing(item.key))),
  deleteAll: () => editedItems.forEach(item => dispatch(deleteItem(item.key))),
});

export const ListGroupActions = connect(mapStateToProps, mapDispatchToProps)(ListGroupActionsComponent);
