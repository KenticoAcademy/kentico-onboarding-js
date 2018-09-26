import { addItemCreator } from './creators/addItemCreator';
import { generateUuid } from '../utils/generateUuid';
import {
  AddItemAction,
  DeleteItemAction,
  FetchFailureAction,
  FetchItemsSuccessAction,
  SaveItemTextAction,
  ToggleItemEditingAction,
} from './types/itemsActionTypes';
import { IItem } from '../models/Item';
import {
  deleteItemCreator,
  getItemsCreator,
  postItemCreator,
  putItemCreator,
} from './creators/fetchCreators';
import { Dispatch } from 'redux';

export const addItem: (text: string) => AddItemAction = addItemCreator(generateUuid);

export const saveItemText = (id: Guid, text: string): SaveItemTextAction => ({
  type: 'SAVE_ITEM_TEXT',
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id: Guid): DeleteItemAction => ({
  type: 'DELETE_ITEM',
  payload: {
    id,
  },
});

export const toggleItemEditing = (id: Guid): ToggleItemEditingAction => ({
  type: 'TOGGLE_ITEM_EDITING',
  payload: {
    id,
  },
});

export const fetchFailure = (error: string): FetchFailureAction => ({
  type: 'FETCH_ERROR',
  payload: {
    error,
  },
});

export const fetchItemsSuccess = (response: IItem[]): FetchItemsSuccessAction => ({
  type: 'FETCH_ITEMS_SUCCESS',
  payload: {
    response,
  },
});

export const getItemsRequest: () => (dispatch: Dispatch) => Promise<FetchItemsSuccessAction | FetchFailureAction> = getItemsCreator(fetch);

export const postItemRequest: (text: string) => (dispatch: Dispatch) => Promise<AddItemAction | FetchFailureAction> = postItemCreator(fetch);

export const putItemRequest: (item: IItem) => (dispatch: Dispatch) => Promise<void | FetchFailureAction> = putItemCreator(fetch);

export const deleteItemRequest: (id: Guid) => (dispatch: Dispatch) => Promise<DeleteItemAction| FetchFailureAction> = deleteItemCreator(fetch);

