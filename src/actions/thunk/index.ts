import {
  cancelItemFactory,
  deleteItemFactory,
  fetchItemsFactory,
  openItemFactory,
  postItemFactory,
  saveNewTextFactory,
} from './actionCreatorsWithDependency';
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

const handleErrors = (response: any) => {
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

export * from './actionCreatorsWithDependency';
