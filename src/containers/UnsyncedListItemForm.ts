import * as PropTypes from 'prop-types';
import {
  ComponentClass,
  connect,
  Dispatch
} from 'react-redux';
import { IAppState } from '../models/state/IAppState';
import { SyncOperation } from '../models/enums/SyncOperation';
import {
  deleteItemAsync,
  postItemAsync,
  saveNewTextAsync
} from '../actions/thunk';
import {
  UnsyncedListItemForm as UnsyncedListItemFormComponent,
  IUnsyncedListItemFormCallbackProps,
  IUnsyncedListItemFormDataProps,
} from '../components/UnsyncedListItemForm';
import { IAction } from '../models/interfaces/IAction';
import {
  changeItemOpenState,
  deleteUnsavedItem,
  saveItemChanges
} from '../actions';
import {
  ISyncedListItemFormContainerDataProps,
  syncedListItemFormContainerPropTypes
} from './SyncedListItemForm';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { IListItem } from '../models/interfaces/IListItem';

const syncToMethod: any = ({ operation }: IItemSyncInfo, { id, text }: IListItem) => {
  switch (operation) {
    case SyncOperation.Add:
      return () => postItemAsync({ text, uri: text });
    case SyncOperation.Modify:
      return () => saveNewTextAsync({ id, text, uri: text });
    case SyncOperation.Delete:
      return () => deleteItemAsync({ id, uri: text });
    default:
      return () => () => null;
  }
};

const propTypes = {
  ...syncedListItemFormContainerPropTypes,
  itemSyncInfo: PropTypes.object.isRequired,
};

export interface IUnsyncedListItemContainerProps extends ISyncedListItemFormContainerDataProps {
  readonly itemSyncInfo: IItemSyncInfo;
}

const mapStateToProps = (state: IAppState, { item: { id } }: IUnsyncedListItemContainerProps): IUnsyncedListItemFormDataProps => ({
  description: state.list.itemsSyncInfo.get(id).description,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>,  { item, item: { id }, itemSyncInfo }: IUnsyncedListItemContainerProps): IUnsyncedListItemFormCallbackProps => ({
  retrySync: dispatch(syncToMethod(itemSyncInfo, item)),
  onSave: (newText: string) =>
    dispatch(
      saveItemChanges(
        id,
        newText,
        itemSyncInfo.operation,
        itemSyncInfo.state,
      )),
  onDelete: itemSyncInfo.operation === SyncOperation.Add ?
    () => dispatch(
      deleteUnsavedItem(id)) :
    () => null,
  onCancel: () =>
    dispatch(
      changeItemOpenState(id)),
});

const UnsyncedListItemForm: ComponentClass<IUnsyncedListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnsyncedListItemFormComponent);

UnsyncedListItemForm.propTypes = propTypes;

export { UnsyncedListItemForm };
