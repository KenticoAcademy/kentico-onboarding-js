import * as React from 'react';
import { connect } from 'react-redux';
import {
  Item as ItemComponent,
  IItemStateProps,
  IItemDispatchProps,
  IItemProps,
  IItemOwnProps
} from '../components/Item';
import { requestDeleteItem, toggleItem, requestSaveItem } from '../actions/ListActions';
import { IAppState } from '../reducers/interfaces/IAppState';
import { getTimeFrom } from '../utils/getTimeFrom';
import { ListSorting } from '../constants/ListSorting';
import { ThunkDispatch } from 'redux-thunk';
import { IAction } from '../actions/IAction';

interface IItemContainerProps extends IItemOwnProps {
  readonly id: Uuid;
  readonly lastRenderTime: Time;
}

const mapStateToProps = ({ list }: IAppState, { id, lastRenderTime }: IItemContainerProps): IItemStateProps => {
  const item = list.items.get(id);
  return {
    item,
    timeToRender: list.sorting === ListSorting.CreatedTime
      ? getTimeFrom(lastRenderTime, item.creationTime)
      : getTimeFrom(lastRenderTime, item.lastUpdateTime)
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, never, IAction>, { id }: IItemContainerProps): IItemDispatchProps => ({
  onSaveItem: (text: string) => dispatch(requestSaveItem(id, text)),
  onDeleteItem: () => dispatch(requestDeleteItem(id)),
  onToggleItem: () => dispatch(toggleItem(id)),
});

const mergeProps = (stateProps: IItemStateProps, dispatchProps: IItemDispatchProps, ownProps: IItemContainerProps): IItemProps => {
  const { id, lastRenderTime, ...otherProps } = ownProps;
  return ({
    ...stateProps,
    ...dispatchProps,
    ...otherProps,
  });
};

export const Item: React.ComponentClass<IItemContainerProps> = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ItemComponent);
