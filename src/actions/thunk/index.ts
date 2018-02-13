import * as fetch from 'isomorphic-fetch';
import {
  addNewItem,
  deleteItem,
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
});
export const postItemAsync: IThunkAction<IPostItemActionParams> = postItemFactory({
  ...configurationObjectBase,
  addNewItem,
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory({
  ...configurationObjectBase,
  deleteItem,
});

export const saveNewTextAsync: IThunkAction<ISaveNewTextActionParams> = saveNewTextFactory({
  ...configurationObjectBase,
  saveItemChanges,
});
