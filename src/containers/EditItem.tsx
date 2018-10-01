import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../reducers/IState';
import {
  deleteItem,
  editItem,
  finishEditItem,
} from '../actions';
import {
  EditItem as EditItemComponent,
  IEditItemOwnProps,
  IEditItemDispatchProps,
  IEditItemStateProps,
} from '../components/EditItem';

const mapStateToProps = (state: IState, { id }: IEditItemOwnProps): IEditItemStateProps => ({
  text: state.items.get(id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, { id }: IEditItemOwnProps): IEditItemDispatchProps => ({
  onSave: (text: string) => dispatch(editItem(id, text)),
  onDelete: () => dispatch(deleteItem(id)),
  onCancel: () => dispatch(finishEditItem(id)),
});

export const EditItem: React.ComponentClass<IEditItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);
