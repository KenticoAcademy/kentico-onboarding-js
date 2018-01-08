import { fetchItemsFactory, postItemFactory } from './actionCreatorsWithDependency';

export const fetchItems = fetchItemsFactory(fetch);
export const postItem = postItemFactory(fetch);

export * from './actionCreatorsWithDependency';
