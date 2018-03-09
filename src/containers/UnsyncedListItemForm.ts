import {
  ComponentClass,
  connect,
  Dispatch
} from 'react-redux';
import { SyncOperation } from '../models/enums/SyncOperation';
import {
  changeItemOpenState,
  deleteUnsavedItem,
} from '../actions';
import {
  CompleteListItemForm as CompleteListItemFormComponent,
  ICompleteListItemFormCallbackProps
} from '../components/CompleteListItemForm';
import {
  IListItemFormOwnProps,
  listItemFormPropTypes,
} from '../components/ListItemForm';
import {
  editItemAsync,
  postItemAsync,
} from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>,  { item: { id, syncedText }, itemSyncInfo }: IListItemFormOwnProps): ICompleteListItemFormCallbackProps => ({
  onSave: (newText: string) =>
    itemSyncInfo.operation === SyncOperation.Add ?
      dispatch(
        postItemAsync({
          text: newText,
          givenId: id,
        })) :
      dispatch(
        editItemAsync({
          syncedText,
          text: newText,
          id,
        })),
  onDelete: itemSyncInfo.operation === SyncOperation.Add ?
    () => dispatch(
      deleteUnsavedItem(id)) :
    () => null,
  onCancel: () =>
    dispatch(
      changeItemOpenState(id)),
});

const UnsyncedListItemForm: ComponentClass<IListItemFormOwnProps> = connect(
  undefined,
  mapDispatchToProps,
)(CompleteListItemFormComponent);

UnsyncedListItemForm.propTypes = listItemFormPropTypes;

export { UnsyncedListItemForm };
