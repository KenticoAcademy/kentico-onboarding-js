import {
  addNewItemConfirm,
  addNewItemRequest,
  deleteItemConfirm,
  deleteItemRequest,
  fetchFailed,
  itemSyncFailed,
  receiveItems,
  requestItems,
  saveItemChangesConfirm,
  saveItemChangesRequest,
} from '../actionCreators';
import { fetchItemsFactory } from './fetchItemsFactory';
import {
  IPostItemActionParams,
  postItemFactory,
} from './postItemFactory';
import {
  deleteItemFactory,
  IDeleteItemActionParams,
} from './deleteItemFactory';
import {
  ISaveNewTextActionParams,
  saveNewTextFactory,
} from './saveNewTextFactory';
import {
  IThunkAction,
  IThunkActionWithoutParams,
} from '../../models/interfaces/IThunkAction';
import { httpClient } from '../../models/classes/AxiosHttpClient';
import { createNewId } from '../../utils/createNewId';
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
  createNewId,
  addNewItemRequest,
  addNewItemConfirm,
  itemSyncFailed,
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory({
  uri,
  httpClient,
  deleteItemRequest,
  deleteItemConfirm,
  itemSyncFailed,
});

export const saveNewTextAsync: IThunkAction<ISaveNewTextActionParams> = saveNewTextFactory({
  uri,
  httpClient,
  saveItemChangesRequest,
  saveItemChangesConfirm,
  itemSyncFailed,
});
