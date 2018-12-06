import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Item as ItemComponent,
  IItemStateProps,
  IItemDispatchProps
} from '../components/Item';
import { saveItem, deleteItem, toggleItem } from '../actions/ListActions';
import { IAppState } from '../reducers/interfaces/IAppState';
import { getTimeFromNow } from '../utils/getTimeFromNow';
import { ListSorting } from '../constants/ListSorting';

interface IItemContainerProps {
  id: Uuid;
}

const mapStateToProps = ({list}: IAppState, {id}: IItemContainerProps): IItemStateProps => {
  const item = list.items.get(id);
  return {
    item,
    timeToRender: list.sorting === ListSorting.CreatedTime ? getTimeFromNow(item.creationTime) : getTimeFromNow(item.lastUpdateTime),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {id}: IItemContainerProps): IItemDispatchProps => ({
  onSaveItem: (text: string) => dispatch(saveItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onToggleItem: () => dispatch(toggleItem(id)),
});

export const Item: React.ComponentClass<IItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ItemComponent);
