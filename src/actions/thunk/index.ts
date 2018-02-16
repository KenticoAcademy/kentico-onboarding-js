import {
  addNewItem,
  confirmAddedItem,
  deleteItem,
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

export const fetchItemsAsync: IThunkAction<IFetchItemsActionParams> = fetchItemsFactory({
  httpClient,
  requestItems,
  receiveItems,
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
