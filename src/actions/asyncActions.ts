import { IItem } from '../models/Item';
import {
  Actions,
  DeleteItemSuccessAction,
  DisplayErrorAction,
  LoadingItemsSuccessAction, PostItemSuccessAction, AddItemErrorAction, PutItemSuccessAction,
} from './types/itemsActionTypes';
import {
  getItemsCreator,
  } from './creators/getItemsCreator';
import { ThunkAction } from 'redux-thunk';
import { generateUuid } from '../utils/generateUuid';
import { postItemCreator } from './creators/postItemCreator';
import { putItemCreator } from './creators/putItemCreator';
import { deleteItemCreator } from './creators/deleteItemCreator';
import { retryCreator } from './creators/retryCreator';

export const getItemsRequest: () => ThunkAction<Promise<LoadingItemsSuccessAction | DisplayErrorAction>, void, void, Actions> = getItemsCreator(fetch);
export const postItemRequest: (text: string) => ThunkAction<Promise<PostItemSuccessAction | AddItemErrorAction>, void, void, Actions> = postItemCreator(fetch, generateUuid, generateUuid);
export const putItemRequest: (item: IItem) => ThunkAction<Promise<PutItemSuccessAction | AddItemErrorAction>, void, void, Actions> = putItemCreator(fetch, generateUuid);
export const deleteItemRequest: (id: Guid) => ThunkAction<Promise<DeleteItemSuccessAction | AddItemErrorAction>, void, void, Actions> = deleteItemCreator(fetch, generateUuid);
export const retryActionRequest = retryCreator(deleteItemRequest, postItemRequest, putItemRequest);
