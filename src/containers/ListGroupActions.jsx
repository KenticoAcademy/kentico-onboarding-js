import { connect } from 'react-redux';

import {
  saveItems,
  deleteItems,
  cancelItemsEditing,
} from '../actions/actionCreators';
import { ListGroupActions as ListGroupActionsComponent } from '../components/ListGroupActions';
import { selectItems } from '../selectors/memorySelector';

const mapStateToProps = (state) => ({
  selectedKeys: selectItems(state.list.items)
    .filter(item => item.isBeingEdited)
    .map(item => item.key)
    .toArray(),
});

const mapDispatchToProps = (dispatch) => ({
  saveSelected: (selectedKeys) => dispatch(saveItems(selectedKeys)),
  cancelSelected: (selectedKeys) => dispatch(cancelItemsEditing(selectedKeys)),
  deleteSelected: (selectedKeys) => dispatch(deleteItems(selectedKeys)),
});

export const ListGroupActions = connect(mapStateToProps, mapDispatchToProps)(ListGroupActionsComponent);
