import {
  cancelItemFactory,
  deleteItemFactory, fetchItemsFactory,
  postItemFactory,
} from './actionCreatorsWithDependency';

export const fetchItems = fetchItemsFactory(fetch);
export const postItem = postItemFactory(fetch);
export const deleteItemFromServer = deleteItemFactory(fetch);
export const cancelItem = cancelItemFactory(fetch);

export * from './actionCreatorsWithDependency';
