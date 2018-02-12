import {
  addNewItem,
  changeItemOpenState,
  deleteItem,
  fetchFailed,
  notifyError,
  notifySuccess,
  receiveItems,
  registerAction,
  requestItems,
  saveItemChanges,
} from '../actionCreators';
import { fetchItemsFactory } from './fetchItemsFactory';
import { postItemFactory } from './postItemFactory';
import { deleteItemFactory } from './deleteItemFactory';
import { saveNewTextFactory } from './saveNewTextFactory';
import { changeItemOpenStateFactory } from './changeItemOpenStateFactory';
import { handleErrors } from './utils/handleErrors';
import { IThunkAction } from '../../models/interfaces/IThunkAction';

const configurationObjectBase = {
  fetch,
  registerAction,
  handleErrors,
};

export const fetchItemsAsync: IThunkAction = fetchItemsFactory({
  ...configurationObjectBase,
  requestItems,
  receiveItems,
  fetchFailed,
});
export const postItemAsync: IThunkAction = postItemFactory({
  ...configurationObjectBase,
  addNewItem,
  notifySuccess,
  notifyError,
});

export const deleteItemAsync: IThunkAction = deleteItemFactory({
  ...configurationObjectBase,
  deleteItem,
  notifySuccess,
  notifyError,
});

export const changeItemOpenStateAsync: IThunkAction = changeItemOpenStateFactory({
  ...configurationObjectBase,
  changeItemOpenState,
  notifyError,
});

export const saveNewTextAsync: IThunkAction = saveNewTextFactory({
  ...configurationObjectBase,
  saveItemChanges,
  notifySuccess,
  notifyError,
});
