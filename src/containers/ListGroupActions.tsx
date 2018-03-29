import { connect, Dispatch } from 'react-redux';

import {
  IListGroupActionsDispatchProps,
  IListGroupActionsStateProps,
  ListGroupActions as ListGroupActionsComponent,
} from '../components/ListGroupActions';
import {
  saveItems,
  deleteItems,
  cancelItemsEditing,
} from '../actions';
import { IAction } from '../@types/IAction';
import { getMemoizedValues } from '../selectors/memorySelector';
import { IState } from '../store/IState';

const mapStateToProps = ({ list }: IState): IListGroupActionsStateProps => ({
  selectedKeys: getMemoizedValues(list.items.valueSeq()
    .filter(item => item!.isBeingEdited)
    .map(item => item!.key)
    .toIndexedSeq()),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IListGroupActionsDispatchProps => ({
  saveSelected: (selectedKeys) => dispatch(saveItems(selectedKeys)),
  cancelSelected: (selectedKeys) => dispatch(cancelItemsEditing(selectedKeys)),
  deleteSelected: (selectedKeys) => dispatch(deleteItems(selectedKeys)),
});

export const ListGroupActions = connect(mapStateToProps, mapDispatchToProps)(ListGroupActionsComponent);
