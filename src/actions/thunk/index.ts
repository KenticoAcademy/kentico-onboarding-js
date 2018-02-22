import {
  addNewItem,
  closeItem,
  confirmAddedItem,
  deleteItem,
  fetchFailed,
  itemSyncFailed,
  itemSyncRequested,
  itemSyncSucceeded,
  receiveItems,
  requestItems,
  saveItemChanges,
} from '../actionCreators';
import { fetchItemsFactory } from './fetchItemsFactory';
import {
  IPostItemActionParams,
  postItemFactory
} from './postItemFactory';
import {
  deleteItemFactory,
  IDeleteItemActionParams
} from './deleteItemFactory';
import {
  ISaveNewTextActionParams,
  saveNewTextFactory
} from './saveNewTextFactory';
import {
  IThunkAction,
  IThunkActionWithoutParams
} from '../../models/interfaces/IThunkAction';
import { httpClient } from '../../models/classes/AxiosHttpClient';
import { createNewId } from '../../utils/createNewId';
import {
  retryActionFactory,
  retryActionWithoutParamsFactory
} from './retryActionFactory';
import { itemCollection } from '../../constants/backendUris';

const uri = itemCollection;

export const fetchItemsAsync: IThunkActionWithoutParams = fetchItemsFactory({
  uri,
  httpClient,
  requestItems,
  receiveItems,
  fetchFailed,
});
export const postItemAsync: IThunkAction<IPostItemActionParams> = postItemFactory({
  uri,
  httpClient,
  addNewItem,
  createNewId,
  confirmAddedItem,
  itemSyncFailed,
  itemSyncRequested
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory({
  uri,
  httpClient,
  deleteItem,
  itemSyncFailed,
  itemSyncRequested,
  closeItem,
});

export const saveNewTextAsync: IThunkAction<ISaveNewTextActionParams> = saveNewTextFactory({
  uri,
  httpClient,
  saveItemChanges,
  itemSyncSucceeded,
  itemSyncFailed,
  itemSyncRequested
});

export const retryActionAsync = retryActionFactory();
export const retryActionWithoutParamsAsync = retryActionWithoutParamsFactory();
