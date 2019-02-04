import * as React from 'react';
import { connect } from 'react-redux';
import {
  ListItemContainerProps,
  ListItemStateProps,
  ListItem as ListItemComponent,
} from '../components/ListItem';
import { IAppState } from '../store/state/IAppState';
import { IItem } from '../models/Item';

const showEditForm = (item: IItem): boolean =>
  item.isBeingEdited && !item.errorId && !item.isSyncing;

const mapStateToProps = (state: IAppState, ownProps: ListItemContainerProps): ListItemStateProps => ({
  showEditForm: showEditForm(state.list.items.get(ownProps.id)),
});

export const ListItem: React.ComponentClass<ListItemContainerProps> = connect(mapStateToProps)(ListItemComponent);
