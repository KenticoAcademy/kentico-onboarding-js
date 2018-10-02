import { IItem } from '../models/Item';
import { Dispatch } from 'redux';
import {
  AddItemAction,
  DeleteItemAction,
  FetchFailureAction,
  FetchItemsSuccessAction,
} from './types/itemsActionTypes';
import {
  deleteItemCreator,
  getItemsCreator,
  postItemCreator,
  putItemCreator,
} from './creators/fetchCreators';

export const getItemsRequest: () => (dispatch: Dispatch) => Promise<FetchItemsSuccessAction | FetchFailureAction> = getItemsCreator(fetch);
export const postItemRequest: (text: string) => (dispatch: Dispatch) => Promise<AddItemAction | FetchFailureAction> = postItemCreator(fetch);
export const putItemRequest: (item: IItem) => (dispatch: Dispatch) => Promise<void | FetchFailureAction> = putItemCreator(fetch);
export const deleteItemRequest: (id: Guid) => (dispatch: Dispatch) => Promise<DeleteItemAction | FetchFailureAction> = deleteItemCreator(fetch);
