import { addItemCreator } from './creators/addItemCreator';
import { generateUuid } from '../utils/generateUuid';
import {
  AddItemAction,
  DeleteItemAction,
  DisplayErrorAction,
  LoadingItemsSuccessAction, DisplayItemErrorAction, PostItemSuccessAction,
  SaveItemTextAction,
  ToggleItemEditingAction, PutItemSuccessAction,
} from './types/itemsActionTypes';
import { IItem } from '../models/Item';

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

export const displayError = (error: string): DisplayErrorAction => ({
  type: 'DISPLAY_ERROR',
  payload: {
    error,
  },
});

export const loadingItemsSuccess = (response: IItem[]): LoadingItemsSuccessAction => ({
  type: 'LOADING_ITEMS_SUCCESS',
  payload: {
    response,
  },
});

export const postItemSuccess = (oldId: Guid, newId: Guid, text: string): PostItemSuccessAction => ({
  type: 'POST_ITEM_SUCCESS',
  payload: {
    oldId,
    newId,
    text,
  },
});

export const displayItemError = (id: Guid, error: string): DisplayItemErrorAction => ({
  type: 'DISPLAY_ITEM_ERROR',
  payload: {
    id,
    error,
  },
});

export const putItemSuccess = (id: Guid): PutItemSuccessAction => ({
  type: 'PUT_ITEM_SUCCESS',
  payload: {
    id,
  },
});
