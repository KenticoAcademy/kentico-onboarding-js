import { connect } from 'react-redux';

import { ListGroupActions as ListGroupActionsComponent } from '../components/ListGroupActions';
import {
  saveItems,
} from '../actions/actionCreators';

const mapDispatchToProps = (dispatch, { selectedKeys }) => ({
  saveAll: () => dispatch(saveItems(selectedKeys)),
  cancelAll: () => undefined,
  deleteAll: () => undefined,
});

export const ListGroupActions = connect(null, mapDispatchToProps)(ListGroupActionsComponent);
