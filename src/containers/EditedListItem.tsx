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
import { updateItem } from '../actions';
import { toggleEditing } from '../actions/simpleActions/toggleEditing';
import { textUpdateChange } from '../actions/simpleActions/textUpdateChange';

const mapStateToProps = (state: IAppState, {itemId}: IEditListItemContainerProps): IEditedListItemDataProps => ({
  item: state.items.byId.get(itemId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {itemId}: IEditListItemContainerProps): IEditedListItemCallbackProps => ({
  onCancel: () => dispatch(toggleEditing(itemId)),
  onSave: (updatedText: string) => updateItem(dispatch)(itemId, updatedText),
  textUpdateChange: (text: string) => dispatch(textUpdateChange(itemId, text)),
});

export const EditedListItem: ComponentClass<IEditListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);
