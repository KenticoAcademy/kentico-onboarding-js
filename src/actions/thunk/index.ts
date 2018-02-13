import * as fetch from 'isomorphic-fetch';
import {
  addNewItem,
  deleteItem,
  fetchFailed,
  notifyError,
  notifySuccess,
  receiveItems,
  requestItems,
  saveItemChanges,
} from '../actionCreators';
import { fetchItemsFactory, IFetchItemsActionParams } from './fetchItemsFactory';
import { IPostItemActionParams, postItemFactory } from './postItemFactory';
import { deleteItemFactory, IDeleteItemActionParams } from './deleteItemFactory';
import { ISaveNewTextActionParams, saveNewTextFactory } from './saveNewTextFactory';
import { handleErrors } from './utils/handleErrors';
import { IThunkAction } from '../../models/interfaces/IThunkAction';

const configurationObjectBase = {
  fetch,
  handleErrors,
};

export const fetchItemsAsync: IThunkAction<IFetchItemsActionParams> = fetchItemsFactory({
  ...configurationObjectBase,
  requestItems,
  receiveItems,
  fetchFailed,
});
export const postItemAsync: IThunkAction<IPostItemActionParams> = postItemFactory({
  ...configurationObjectBase,
  addNewItem,
  notifySuccess,
  notifyError,
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory({
  ...configurationObjectBase,
  deleteItem,
  notifySuccess,
  notifyError,
});

export const saveNewTextAsync: IThunkAction<ISaveNewTextActionParams> = saveNewTextFactory({
  ...configurationObjectBase,
  saveItemChanges,
  notifySuccess,
  notifyError,
});
