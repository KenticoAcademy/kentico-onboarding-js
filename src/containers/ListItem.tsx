import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IListItemDataProps,
  ListItem as ListItemComponent
} from '../components/ListItem';
import { IAppState } from '../reducers/IAppState';
import { ItemId } from '../models/ItemId';
import * as React from 'react';
import { toggleEditing } from '../actions';

export interface IListItemContainerProps {
  id: ItemId;
  index: number;
}

export interface IListItemCallbackProps {
  onDivClick: React.MouseEventHandler<HTMLDivElement>;
}

function mapStateToProps(state: IAppState, {id, index}: IListItemContainerProps): IListItemDataProps {
  const item = state.items.byId.get(id);
  return (
    {
      text: item.text,
      id,
      isBeingEdited: item.isBeingEdited,
      index,
      synchronized: item.synchronized,
      errorMessage: item.errorMessage,
      isBeingDeleted: item.isBeingDeleted,
    });
}

const mapDispatchToProps = (dispatch: Function, { id }: IListItemContainerProps): IListItemCallbackProps => ({
  onDivClick: () => dispatch(toggleEditing(id)),
});


export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
