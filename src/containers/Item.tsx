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
import { getTimeFrom } from '../utils/getTimeFrom';
import { ListSorting } from '../constants/ListSorting';

interface IItemContainerProps {
  id: Uuid;
  lastRenderTime: Time;
}

const mapStateToProps = ({list}: IAppState, {id, lastRenderTime}: IItemContainerProps): IItemStateProps => {
  const item = list.items.get(id);
  return {
    item,
    timeToRender: list.sorting === ListSorting.CreatedTime ? getTimeFrom(lastRenderTime, item.creationTime) : getTimeFrom(lastRenderTime, item.lastUpdateTime),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {id}: IItemContainerProps): IItemDispatchProps => ({
  onSaveItem: (text: string) => dispatch(saveItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onToggleItem: () => dispatch(toggleItem(id)),
});

export const Item: React.ComponentClass<IItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ItemComponent);
