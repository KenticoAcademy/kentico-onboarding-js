import { connect } from 'react-redux';
import { EditedListItem as EditedListItemComponent, IEditedListItemCallbackProps, IEditedListItemDataProps } from '../components/EditedListItem';
import {
  deleteItem,
  toggleEditing,
  updateItemText,
  textUpdateChange,
} from '../actions/actionCreators';
import { IAppState } from '../stores/IAppState';

interface IEditListItemContainerProps {
  itemId: string;
  updatedText: string;
}

function mapStateToProps(state: IAppState, { itemId }: IEditListItemContainerProps): IEditedListItemDataProps {
  const item = state.items.byId.get(itemId);
  return {
    itemText: item.text,
    textUpdate: item.textUpdate,
  };
}

const mapDispatchToProps = (dispatch: Function, { itemId, updatedText }: IEditListItemContainerProps): IEditedListItemCallbackProps => ({
  onDelete: () => dispatch(deleteItem(itemId)),
  onCancel: () => dispatch(toggleEditing(itemId)),
  onSave: () => dispatch(updateItemText(itemId, updatedText)),
  textUpdateChange: (text: string) => dispatch(textUpdateChange(itemId, text)),
});

export const EditedListItem = connect(mapStateToProps, mapDispatchToProps)(EditedListItemComponent);

