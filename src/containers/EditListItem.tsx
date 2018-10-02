import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
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
import { deleteItemRequest, putItemRequest } from '../actions/fetchActions';

const mapStateToProps = (state: IAppState, ownProps: EditListItemContainerProps): EditListItemStateProps => ({
  text: state.list.items.get(ownProps.id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: EditListItemContainerProps): EditListItemDispatchProps => ({
  save: (text: string) => dispatch<any>(putItemRequest(new Item({id: ownProps.id, text} ))),
  delete: () => dispatch<any>(deleteItemRequest(ownProps.id)),
  cancel: () => dispatch(toggleItemEditing(ownProps.id)),
});

export const EditListItem: React.ComponentClass<EditListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditListItemComponent);
