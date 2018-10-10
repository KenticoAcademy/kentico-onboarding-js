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
import { Item } from '../models/Item';
import { deleteItemRequest, putItemRequest } from '../actions/asyncActions';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/types/itemsActionTypes';

const mapStateToProps = (state: IAppState, ownProps: EditListItemContainerProps): EditListItemStateProps => ({
  text: state.list.items.get(ownProps.id).text,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Actions>, ownProps: EditListItemContainerProps): EditListItemDispatchProps => ({
  save: (text: string) => dispatch(putItemRequest(new Item({id: ownProps.id, text} ))),
  delete: () => dispatch(deleteItemRequest(ownProps.id)),
  cancel: () => dispatch(toggleItemEditing(ownProps.id)),
});

export const EditListItem: React.ComponentClass<EditListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditListItemComponent);
