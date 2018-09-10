import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../reducers/IState';
import {
  deleteItem,
  editItem,
} from '../actions/actionCreators';
import {
  EditItem as EditItemComponent,
  IEditItemProps,
  IEditItemDispatchProps,
  IEditItemStateProps,
} from '../components/EditItem';

const mapStateToProps = (state: IState, {id}: { id: GUID }): IEditItemStateProps => ({
  text: state.items.get(id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: { id: GUID }): IEditItemDispatchProps => ({
  onSave: (text: string) => dispatch(editItem(id, text)),
  onDelete: () => dispatch(deleteItem(id)),
});

export const EditItem: React.ComponentClass<IEditItemProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);
