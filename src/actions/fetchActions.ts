import { IItem } from '../models/Item';
import {
  Actions,
  DeleteItemAction,
  FetchFailureAction,
  FetchItemsSuccessAction,
} from './types/itemsActionTypes';
import {
  getItemsCreator,
  } from './creators/getItemsCreator';
import { IAppState } from '../store/state/IAppState';
import { ThunkAction } from 'redux-thunk';
import { generateUuid } from '../utils/generateUuid';
import { postItemCreator } from './creators/postItemCreator';
import { putItemCreator } from './creators/putItemCreator';
import { deleteItemCreator } from './creators/deleteItemCreator';

export const getItemsRequest: () => ThunkAction<Promise<FetchFailureAction | FetchItemsSuccessAction>, void, void, Actions> = getItemsCreator(fetch);
export const postItemRequest: (text: string) => ThunkAction<Promise<void>, void, void, Actions> = postItemCreator(fetch, generateUuid);
export const putItemRequest: (item: IItem) => ThunkAction<Promise<void | Response>, IAppState, void, Actions> = putItemCreator(fetch);
export const deleteItemRequest: (id: Guid) => ThunkAction<Promise<FetchFailureAction | DeleteItemAction>, void, void, Actions> = deleteItemCreator(fetch);
