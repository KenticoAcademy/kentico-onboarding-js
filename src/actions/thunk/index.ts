import {
  addNewItem,
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
import {
  fetchItemsFactory,
  IFetchItemsActionParams
} from './fetchItemsFactory';
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
import { IThunkAction } from '../../models/interfaces/IThunkAction';
import { httpClient } from '../../models/classes/AxiosHttpClient';
import { createNewId } from '../../utils/createNewId';
import {
  retryActionFactory
} from './retryActionFactory';

export const fetchItemsAsync: IThunkAction<IFetchItemsActionParams> = fetchItemsFactory({
  httpClient,
  requestItems,
  receiveItems,
  fetchFailed,
});
export const postItemAsync: IThunkAction<IPostItemActionParams> = postItemFactory({
  httpClient,
  addNewItem,
  createNewId,
  confirmAddedItem,
  itemSyncFailed,
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory({
  httpClient,
  deleteItem,
  itemSyncFailed,
  itemSyncRequested,
});

export const saveNewTextAsync: IThunkAction<ISaveNewTextActionParams> = saveNewTextFactory({
  httpClient,
  saveItemChanges,
  itemSyncSucceeded,
  itemSyncFailed,
});

export const retryActionAsync = retryActionFactory();
