import {
  addNewItem,
  cancelItemChanges,
  deleteItem,
  fetchFailed,
  notifyError,
  notifySuccess,
  openItemForEditing,
  receiveItems,
  registerAction,
  requestItems,
  saveItemChanges,
} from '../actionCreators';
import { fetchItemsFactory } from './fetchItemsFactory';
import { postItemFactory } from './postItemFactory';
import { deleteItemFactory } from './deleteItemFactory';
import { cancelItemFactory } from './cancelItemFactory';
import { openItemFactory } from './openItemFactory';
import { saveNewTextFactory } from './saveNewTextFactory';

const handleErrors = (response: Response): Response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

const configurationObjectBase = {
  fetch,
  notifyError,
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
});

export const deleteItemFromServer = deleteItemFactory({
  ...configurationObjectBase,
  deleteItem,
  notifySuccess,
});

export const cancelItem = cancelItemFactory({
  ...configurationObjectBase,
  cancelItemChanges,
});
export const openItem = openItemFactory({
  ...configurationObjectBase,
  openItemForEditing,
});

export const saveNewText = saveNewTextFactory({
  ...configurationObjectBase,
  saveItemChanges,
  notifySuccess,
});
