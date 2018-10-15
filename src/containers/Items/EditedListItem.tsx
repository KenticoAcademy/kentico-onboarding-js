import {
  connect
} from 'react-redux';
import { ComponentClass } from 'react';
import {
  EditedListItem as EditedListItemComponent,
  IEditedListItemDispatchProps,
  IEditedListItemStateProps,
} from '../../components/Items/EditedListItem';
import { IAppState } from '../../reducers/IAppState';
import { CreateUpdateItem } from '../../actions';
import { toggleEditing } from '../../actions/simpleActions/toggleEditing';
import { textUpdateChange } from '../../actions/simpleActions/textUpdateChange';
import { Dispatch} from 'redux';
import { assertAlert } from '../../utils/assertAlert';
import {ItemId} from '../../models/ItemId';

export interface IEditListItemContainerProps {
  itemId: ItemId;
}

const mapStateToProps = (state: IAppState, {itemId}: IEditListItemContainerProps): IEditedListItemStateProps => ({
  item: state.items.byId.get(itemId),

});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {itemId}: IEditListItemContainerProps): IEditedListItemDispatchProps => ({
  onCancel: () => dispatch(toggleEditing(itemId)),
  onSave: (updatedText: string) => dispatch(CreateUpdateItem(itemId, updatedText)),
  textUpdateChange: (text: string) => dispatch(textUpdateChange(itemId, text)),
  assertAlert: (type, message) =>  assertAlert(type, message),
});

export const EditedListItem: ComponentClass<IEditListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);
