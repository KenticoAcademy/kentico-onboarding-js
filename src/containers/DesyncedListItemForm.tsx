import {
  ComponentClass,
  connect,
  Dispatch,
} from 'react-redux';
import { SyncOperation } from '../models/enums/SyncOperation';
import {
  toggleItem,
  deleteUnsavedItem,
} from '../actions';
import {
  CompleteListItemForm as CompleteListItemFormComponent,
  ICompleteListItemFormCallbackProps,
} from '../components/CompleteListItemForm';
import {
  IListItemFormOwnProps,
  listItemFormPropTypes,
} from '../components/ListItemForm';
import {
  deleteItemAsync,
  updateItemAsync,
  addItemAsync,
} from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>,  { item, itemSyncInfo }: IListItemFormOwnProps): ICompleteListItemFormCallbackProps => {
  const { syncedText, id } = item;
  const addingFailed = itemSyncInfo.operation === SyncOperation.Add;

  if (addingFailed) {
    return {
      onSave: (newText: string) => dispatch(addItemAsync({
        text: newText,
        givenId: id,
      })),
      onDelete: () => dispatch(deleteUnsavedItem(id)),
      onCancel: () => dispatch(toggleItem(id)),
    };
  }

  return {
    onSave: (newText: string) => dispatch(updateItemAsync({
      syncedText,
      text: newText,
      id,
    })),
    onDelete: () => dispatch(deleteItemAsync({ id })),
    onCancel: () => dispatch(toggleItem(id)),
  };
};

const DesyncedListItemForm: ComponentClass<IListItemFormOwnProps> = connect(
  undefined,
  mapDispatchToProps,
)(CompleteListItemFormComponent);

DesyncedListItemForm.propTypes = listItemFormPropTypes;

export { DesyncedListItemForm };
