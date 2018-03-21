import { connect } from 'react-redux';

import { ListGroupActions as ListGroupActionsComponent } from '../components/ListGroupActions';
import {
  saveItems,
  deleteItems,
} from '../actions/actionCreators';

const mapDispatchToProps = (dispatch, { selectedKeys }) => ({
  saveAll: () => dispatch(saveItems(selectedKeys)),
  cancelAll: () => undefined,
  deleteSelected: () => dispatch(deleteItems(selectedKeys)),
});

export const ListGroupActions = connect(null, mapDispatchToProps)(ListGroupActionsComponent);
