import {
  cancelItemFactory,
  deleteItemFactory, fetchItemsFactory, openItemFactory,
  postItemFactory, saveNewTextFactory,
} from './actionCreatorsWithDependency';

export const fetchItems = fetchItemsFactory(fetch);
export const postItem = postItemFactory(fetch);
export const deleteItemFromServer = deleteItemFactory(fetch);
export const cancelItem = cancelItemFactory(fetch);
export const openItem = openItemFactory(fetch);
export const saveNewText = saveNewTextFactory(fetch);

export * from './actionCreatorsWithDependency';
