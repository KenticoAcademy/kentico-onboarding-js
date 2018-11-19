import * as React from 'react';
import { connect } from 'react-redux';
import {
  toggleItemEditing,
} from '../actions/itemsActions';
import {
  EditListItem as EditListItemComponent,
  EditListItemContainerProps,
  EditListItemDispatchProps,
  EditListItemStateProps,
} from '../components/EditListItem';
import { IAppState } from '../store/state/IAppState';
import { deleteItemThunk, putItemThunk } from '../actions/thunkActions/thunkActions';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/types/itemsActionTypes';

const mapStateToProps = (state: IAppState, ownProps: EditListItemContainerProps): EditListItemStateProps => ({
  text: state.list.items.get(ownProps.id).text,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Actions>, ownProps: EditListItemContainerProps): EditListItemDispatchProps => ({
  save: (text: string) => dispatch(putItemThunk(ownProps.id, text)),
  delete: () => dispatch(deleteItemThunk(ownProps.id)),
  cancel: () => dispatch(toggleItemEditing(ownProps.id)),
});

export const EditListItem: React.ComponentClass<EditListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditListItemComponent);
