import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IListItemDataProps,
  ListItem as ListItemComponent
} from '../components/ListItem';
import { IAppState } from '../reducers/IAppState';
import { ItemId } from '../models/ItemId';

export interface IListItemContainerProps {
  id: ItemId;
  index: number;
}

function mapStateToProps(state: IAppState, {id, index}: IListItemContainerProps): IListItemDataProps {
  const item = state.items.byId.get(id);
  return (
    {
      id,
      isBeingEdited: item.isBeingEdited,
      index,
      synchronized: item.synchronized,
      errorMessage: item.errorMessage,
      isBeingDeleted: item.isBeingDeleted,
    });
}

export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps)(ListItemComponent);
