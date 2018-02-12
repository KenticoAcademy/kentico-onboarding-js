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

const handleErrors = (response: Response): Response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

const configurationObjectBase = {
  fetch,
  registerAction,
  handleErrors,
};

export const fetchItems = fetchItemsFactory({
  ...configurationObjectBase,
  requestItems,
  receiveItems,
  fetchFailed,
});
export const postItem = postItemFactory({
  ...configurationObjectBase,
  addNewItem,
  notifySuccess,
  notifyError,
});

export const deleteItemFromServer = deleteItemFactory({
  ...configurationObjectBase,
  deleteItem,
  notifySuccess,
  notifyError,
});

export const changeItemOpenStateAsync = changeItemOpenStateFactory({
  ...configurationObjectBase,
  changeItemOpenState,
  notifyError,
});

export const saveNewText = saveNewTextFactory({
  ...configurationObjectBase,
  saveItemChanges,
  notifySuccess,
  notifyError,
});
