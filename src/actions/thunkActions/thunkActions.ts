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
} from '../utils/itemRequests';
import { ErrorAction } from '../types/ErrorAction';

export const getItemsThunk = getItemsFactory({ getItemsRequest });

export const postItemThunk = postItemFactory({
  postItemRequest,
  generateId: generateUuid,
  createItemError: createItemErrorFactory(generateUuid, ErrorAction.Add),
});

export const repostItemThunk = repostItemFactory({
  postItemRequest,
  generateId: generateUuid,
  createItemError: createItemErrorFactory(generateUuid, ErrorAction.Add),
});

export const putItemThunk = putItemFactory({
  putItemRequest,
  createItemError: createItemErrorFactory(generateUuid, ErrorAction.Update),
});

export const deleteItemThunk = deleteItemFactory({
  deleteItemRequest,
  createItemError: createItemErrorFactory(generateUuid, ErrorAction.Delete),
});

export const retryThunkActionThunk = retryThunkActionFactory({ deleteItemThunk, repostItemThunk, putItemThunk });
