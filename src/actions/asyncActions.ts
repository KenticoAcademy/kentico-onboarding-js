import { getItemsCreator } from './creators/getItemsCreator';
import { generateUuid } from '../utils/generateUuid';
import { postItemCreator } from './creators/postItemCreator';
import { putItemCreator } from './creators/putItemCreator';
import { deleteItemCreator } from './creators/deleteItemCreator';
import { retryCreator } from './creators/retryCreator';
import { addItemCreator } from './creators/addItemCreator';
import { addItemErrorCreator } from './creators/addItemErrorCreator';

export const getItemsRequest = getItemsCreator(fetch);
export const postItemRequest = postItemCreator(fetch, addItemCreator(generateUuid), addItemErrorCreator(generateUuid));
export const putItemRequest = putItemCreator(fetch, addItemErrorCreator(generateUuid));
export const deleteItemRequest = deleteItemCreator(fetch, addItemErrorCreator(generateUuid));
export const retryActionRequest = retryCreator(deleteItemRequest, postItemRequest, putItemRequest);
