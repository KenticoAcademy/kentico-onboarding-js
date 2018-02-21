import { connect, Dispatch } from 'react-redux';
import { ComponentClass } from 'react';
import { EditedListItem as EditedListItemComponent, IEditedListItemCallbackProps, IEditedListItemDataProps } from '../components/EditedListItem';
import { IAppState } from '../reducers/IAppState';
import { IItem } from '../models/Item';
import { ItemId } from '../models/ItemId';
import * as actionCreators from  '../actions';

interface IEditListItemContainerProps {
  itemId: ItemId;
}

function mapStateToProps(state: IAppState, { itemId }: IEditListItemContainerProps): IEditedListItemDataProps {
  const item: IItem = state.items.byId.get(itemId);
  return {
    item: item,
    textUpdate: item.textUpdate,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { itemId }: IEditListItemContainerProps): IEditedListItemCallbackProps => ({
  onDelete: () => dispatch(actionCreators.deleteItem(itemId)),
  onCancel: () => dispatch(actionCreators.toggleEditing(itemId)),
  onSave: () => dispatch(actionCreators.updateItemText(itemId)),
  textUpdateChange: (text: string) => dispatch(actionCreators.textUpdateChange(itemId, text)),
});

export const EditedListItem: ComponentClass<IEditListItemContainerProps>  = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);

