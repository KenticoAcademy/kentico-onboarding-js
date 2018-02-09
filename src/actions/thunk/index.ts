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

export const fetchItems = fetchItemsFactory(fetch)(requestItems)(receiveItems)(fetchFailed)(notifyError)(registerAction)(handleErrors);
export const postItem = postItemFactory(fetch)(addNewItem)(notifySuccess)(notifyError)(registerAction)(handleErrors);
export const deleteItemFromServer = deleteItemFactory(fetch)(deleteItem)(notifySuccess)(notifyError)(registerAction)(handleErrors);
export const cancelItem = cancelItemFactory(fetch)(cancelItemChanges)(notifyError)(registerAction)(handleErrors);
export const openItem = openItemFactory(fetch)(openItemForEditing)(notifyError)(registerAction)(handleErrors);
export const saveNewText = saveNewTextFactory(fetch)(saveItemChanges)(notifySuccess)(notifyError)(registerAction)(handleErrors);
