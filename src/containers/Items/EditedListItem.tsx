import {
  connect
} from 'react-redux';
import { ComponentClass } from 'react';
import {
  EditedListItem as EditedListItemComponent,
  IEditedListItemCallbackProps,
  IEditedListItemDataProps,
  IEditListItemContainerProps
} from '../../components/Items/EditedListItem';
import { IAppState } from '../../reducers/IAppState';
import { CreateUpdateItem } from '../../actions';
import { toggleEditing } from '../../actions/simpleActions/toggleEditing';
import { textUpdateChange } from '../../actions/simpleActions/textUpdateChange';
import { Dispatch} from 'redux';
import { assertAlert } from '../../utils/assertAlert';

const mapStateToProps = (state: IAppState, {itemId}: IEditListItemContainerProps): IEditedListItemDataProps => ({
  item: state.items.byId.get(itemId),

});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {itemId}: IEditListItemContainerProps): IEditedListItemCallbackProps => ({
  onCancel: () => dispatch(toggleEditing(itemId)),
  onSave: (updatedText: string) => dispatch(CreateUpdateItem(itemId, updatedText)),
  textUpdateChange: (text: string) => dispatch(textUpdateChange(itemId, text)),
  assertAlert: (type, message) =>  assertAlert(type, message),
});

export const EditedListItem: ComponentClass<IEditListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);
