import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../reducers/IState';
import {
  deleteItem,
  editItem,
} from '../actions';
import {
  EditItem as EditItemComponent,
  IEditItemOwnProps,
  IEditItemDispatchProps,
  IEditItemStateProps,
} from '../components/EditItem';

const mapStateToProps = (state: IState, {id}: { id: Guid }): IEditItemStateProps => ({
  text: state.items.get(id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: { id: Guid }): IEditItemDispatchProps => ({
  onSave: (text: string) => dispatch(editItem(id, text)),
  onDelete: () => dispatch(deleteItem(id)),
});

export const EditItem: React.ComponentClass<IEditItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);
