import {
  connect,
  Dispatch
} from 'react-redux';
import { ComponentClass } from 'react';
import {
  EditedListItem as EditedListItemComponent,
  IEditedListItemCallbackProps,
  IEditedListItemDataProps,
  IEditListItemContainerProps
} from '../components/EditedListItem';
import { IAppState } from '../reducers/IAppState';
import { IItem } from '../models/Item';
import {
  toggleEditing,
  updateItemText,
  textUpdateChange,
  deleteItem
} from '../actions';

function mapStateToProps(state: IAppState, {itemId}: IEditListItemContainerProps): IEditedListItemDataProps {
  const item: IItem = state.items.byId.get(itemId);
  return {
    item,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {itemId}: IEditListItemContainerProps): IEditedListItemCallbackProps => ({
  onDelete: () => dispatch(deleteItem(itemId)),
  onCancel: () => dispatch(toggleEditing(itemId)),
  onSave: () => dispatch(updateItemText(itemId)),
  textUpdateChange: (text: string) => dispatch(textUpdateChange(itemId, text)),
});

export const EditedListItem: ComponentClass<IEditListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);
