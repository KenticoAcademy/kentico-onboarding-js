import { connect, Dispatch } from 'react-redux';
import { EditedListItem as EditedListItemComponent, IEditedListItemCallbackProps, IEditedListItemDataProps } from '../components/EditedListItem';
import {
  deleteItem,
  toggleEditing,
  updateItemText,
  textUpdateChange,
} from '../actions/actionCreators';
import { IAppState } from '../stores/IAppState';
import { ComponentClass } from 'react';
import { IItem } from '../models/Item';
import { ItemId } from '../models/ItemId';

interface IEditListItemContainerProps {
  itemId: ItemId;
}

function mapStateToProps(state: IAppState, { itemId }: IEditListItemContainerProps): IEditedListItemDataProps {
  const item: IItem = state.items.byId.get(itemId);
  return {
    itemText: item.text,
    textUpdate: item.textUpdate,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { itemId }: IEditListItemContainerProps): IEditedListItemCallbackProps => ({
  onDelete: () => dispatch(deleteItem(itemId)),
  onCancel: () => dispatch(toggleEditing(itemId)),
  onSave: () => dispatch(updateItemText(itemId)),
  textUpdateChange: (text: string) => dispatch(textUpdateChange(itemId, text)),
});

export const EditedListItem: ComponentClass<IEditListItemContainerProps>  = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);

