import { connect } from 'react-redux';

import {
  saveItems,
  deleteItems,
  cancelItemsEditing,
} from '../actions';
import { ListGroupActions as ListGroupActionsComponent } from '../components/ListGroupActions';
import { getMemoizedValues } from '../selectors/memorySelector';

const mapStateToProps = ({ list }) => ({
  selectedKeys: getMemoizedValues(list.items.valueSeq()
    .filter(item => item.isBeingEdited)
    .map(item => item.key)),
});

const mapDispatchToProps = (dispatch) => ({
  saveSelected: (selectedKeys) => dispatch(saveItems(selectedKeys)),
  cancelSelected: (selectedKeys) => dispatch(cancelItemsEditing(selectedKeys)),
  deleteSelected: (selectedKeys) => dispatch(deleteItems(selectedKeys)),
});

export const ListGroupActions = connect(mapStateToProps, mapDispatchToProps)(ListGroupActionsComponent);
