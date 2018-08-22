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

interface IItemContainerProps {
  id: Uuid;
}

const mapStateToProps = ({list}: IAppState, {id}: IItemContainerProps): IItemStateProps => ({
  item: list.items.get(id)
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: IItemContainerProps): IItemDispatchProps => ({
  onSaveItem: (text: string) => dispatch(saveItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onToggleItem: () => dispatch(toggleItem(id)),
});

export const Item: React.ComponentClass<IItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ItemComponent);
