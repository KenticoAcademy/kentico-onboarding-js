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
  IEditItemActionParams,
  editItemFactory,
} from './editItemFactory';
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
  addNewItemFailed: itemSyncFailed,
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory({
  uri,
  httpClient,
  deleteItemRequest,
  deleteItemConfirm,
  deleteItemFailed: itemSyncFailed,
});

export const editItemAsync: IThunkAction<IEditItemActionParams> = editItemFactory({
  uri,
  httpClient,
  saveItemChangesRequest,
  saveItemChangesConfirm,
  saveItemChangesFailed: itemSyncFailed,
});
