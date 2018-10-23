import { connect } from 'react-redux';
import {
  stopItemEditing,
  deleteItem,
  updateItemText,
} from '../actions';
import { IAction } from '../actions/IAction';
import { Dispatch } from 'redux';
import { IStore } from '../store/IAppState';
import {
  EditableItem as EditableItemComponent, IEditableItemDispatchProps, IEditableItemStateProps,
} from '../components/EditableItem';
import { ComponentClass } from 'react';

interface IEditableItemContainerProps {
  readonly id: Uuid;
  readonly index: number;
}

const mapStateToProps = (state: IStore, ownProps: IEditableItemContainerProps): IEditableItemStateProps => ({
  item: state.todoList.items.get(ownProps.id),
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IEditableItemContainerProps): IEditableItemDispatchProps => ({
  onCancelClick: () => dispatch(stopItemEditing(ownProps.id)),
  onDeleteClick: () => dispatch(deleteItem(ownProps.id)),
  onSaveClick: (text: string) => dispatch(updateItemText(ownProps.id, text)),
});

export const EditableItem: ComponentClass<IEditableItemContainerProps> =
  connect(mapStateToProps, mapDispatchToProps)(EditableItemComponent);
