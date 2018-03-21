import { connect } from 'react-redux';

import { ListGroupActions as ListGroupActionsComponent } from '../components/ListGroupActions';
import {
  saveItems,
  deleteItems,
  cancelItemsEditing,
} from '../actions/actionCreators';

const mapDispatchToProps = (dispatch, { selectedKeys }) => ({
  saveSelected: () => dispatch(saveItems(selectedKeys)),
  cancelSelected: () => dispatch(cancelItemsEditing(selectedKeys)),
  deleteSelected: () => dispatch(deleteItems(selectedKeys)),
});

export const ListGroupActions = connect(null, mapDispatchToProps)(ListGroupActionsComponent);
