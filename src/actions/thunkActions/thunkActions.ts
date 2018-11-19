import { getItemsFactory } from '../thunkFactories/getItemsFactory';
import { generateUuid } from '../../utils/generateUuid';
import {
  postItemFactory,
  repostItemFactory,
} from '../thunkFactories/postItemFactory';
import { putItemFactory } from '../thunkFactories/putItemFactory';
import { deleteItemFactory } from '../thunkFactories/deleteItemFactory';
import { retryThunkActionFactory } from '../thunkFactories/retryThunkActionFactory';
import { createItemErrorFactory } from '../utils/createItemErrorFactory';
import {
  deleteItemRequest,
  getItemsRequest,
  postItemRequest,
  putItemRequest,
} from './itemRequests';

const createItemError = createItemErrorFactory(generateUuid);

export const getItemsThunk = getItemsFactory({ getItemsRequest });
export const postItemThunk = postItemFactory({ postItemRequest, generateId: generateUuid, createItemError });
export const repostItemThunk = repostItemFactory({ postItemRequest, generateId: generateUuid, createItemError });
export const putItemThunk = putItemFactory({ putItemRequest, createItemError });
export const deleteItemThunk = deleteItemFactory({ deleteItemRequest, createItemError });
export const retryThunkActionThunk = retryThunkActionFactory({ deleteItemThunk, repostItemThunk, putItemThunk });
