import { getItemsCreator } from './creators/getItemsCreator';
import { generateUuid } from '../utils/generateUuid';
import { postItemCreator } from './creators/postItemCreator';
import { putItemCreator } from './creators/putItemCreator';
import { deleteItemCreator } from './creators/deleteItemCreator';
import { retryCreator } from './creators/retryCreator';
import { addItemCreator } from './creators/addItemCreator';
import { addItemErrorCreator } from './creators/addItemErrorCreator';
import { fetchFactory } from './utils/fetchFactory';
import { headerBase } from './utils/headerBase';
import { urlBase } from './utils/urlBase';

export const itemFetch = fetchFactory(fetch, urlBase, headerBase);
export const getItemsRequest = getItemsCreator(itemFetch);
export const postItemRequest = postItemCreator(itemFetch, addItemCreator(generateUuid), addItemErrorCreator(generateUuid));
export const putItemRequest = putItemCreator(itemFetch, addItemErrorCreator(generateUuid));
export const deleteItemRequest = deleteItemCreator(itemFetch, addItemErrorCreator(generateUuid));
export const retryActionRequest = retryCreator(deleteItemRequest, postItemRequest, putItemRequest);
