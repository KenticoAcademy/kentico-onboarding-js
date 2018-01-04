import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import { IListItemDataProps, ListItem as ListItemComponent } from '../components/ListItem';
import { IAppState } from '../stores/IAppState';
import { ItemId } from '../models/ItemId';

export interface IListItemContainerProps {
  id: ItemId;
}

const mapStateToProps = (state: IAppState, { id }: IListItemContainerProps): IListItemDataProps => ({
  id,
  isBeingEdited: state.items.byId.get(id).isBeingEdited,
});

export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps)(ListItemComponent);
