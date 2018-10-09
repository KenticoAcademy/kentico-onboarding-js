import * as React from 'react';
import { connect } from 'react-redux';
import {
  ListItemContainerProps,
  ListItemStateProps,
  ListItem as ListItemComponent,
} from '../components/ListItem';
import { IAppState } from '../store/state/IAppState';

const mapStateToProps = (state: IAppState, ownProps: ListItemContainerProps): ListItemStateProps => ({
  isBeingEdited: state.list.items.get(ownProps.id).isBeingEdited,
  isSyncing: state.list.items.get(ownProps.id).isSyncing,
  errorId: state.list.items.get(ownProps.id).errorId,
});

export const ListItem: React.ComponentClass<ListItemContainerProps> = connect(mapStateToProps)(ListItemComponent);
