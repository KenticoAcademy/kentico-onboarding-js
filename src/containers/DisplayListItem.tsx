import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleItemEditing } from '../actions/itemsActions';
import {
  DisplayListItem as DisplayListItemComponent,
  DisplayListItemContainerProps,
  DisplayListItemDispatchProps,
  DisplayListItemStateProps,
} from '../components/DisplayListItem';
import { IAppState } from '../store/state/IAppState';

const mapStateToProps = (state: IAppState, ownProps: DisplayListItemContainerProps): DisplayListItemStateProps => ({
  text: state.list.items.get(ownProps.id).text,
  showLoader: !state.list.items.get(ownProps.id).errorId && state.list.items.get(ownProps.id).isSyncing,
  isSyncing: state.list.items.get(ownProps.id).isSyncing,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: DisplayListItemContainerProps): DisplayListItemDispatchProps => ({
  enableEditing: () => dispatch(toggleItemEditing(ownProps.id)),
});

export const DisplayListItem: React.ComponentClass<DisplayListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayListItemComponent);
