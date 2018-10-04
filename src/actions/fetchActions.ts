import { IItem } from '../models/Item';
import {
  Actions,
  DeleteItemAction,
  DisplayErrorAction,
  LoadingItemsSuccessAction, PostItemSuccessAction, DisplayItemErrorAction, PutItemSuccessAction,
} from './types/itemsActionTypes';
import {
  getItemsCreator,
  } from './creators/getItemsCreator';
import { ThunkAction } from 'redux-thunk';
import { generateUuid } from '../utils/generateUuid';
import { postItemCreator } from './creators/postItemCreator';
import { putItemCreator } from './creators/putItemCreator';
import { deleteItemCreator } from './creators/deleteItemCreator';

export const getItemsRequest: () => ThunkAction<Promise<LoadingItemsSuccessAction | DisplayErrorAction>, void, void, Actions> = getItemsCreator(fetch);
export const postItemRequest: (text: string) => ThunkAction<Promise<PostItemSuccessAction | DisplayItemErrorAction>, void, void, Actions> = postItemCreator(fetch, generateUuid);
export const putItemRequest: (item: IItem) => ThunkAction<Promise<void | PutItemSuccessAction>, void, void, Actions> = putItemCreator(fetch);
export const deleteItemRequest: (id: Guid) => ThunkAction<Promise<DisplayErrorAction | DeleteItemAction>, void, void, Actions> = deleteItemCreator(fetch);
