import { addItemCreator } from './creators/addItemCreator';
import { generateUuid } from '../utils/generateUuid';
import {
  AddItemAction,
  DeleteItemSuccessAction,
  DisplayErrorAction,
  LoadingItemsSuccessAction,
  AddItemErrorAction,
  PostItemSuccessAction,
  SaveItemTextAction,
  ToggleItemEditingAction,
  PutItemSuccessAction,
  SetItemSyncingAction,
  DeleteItemErrorAction,
  CancelItemUpdatingAction,
} from './types/itemsActionTypes';
import { IItem } from '../models/Item';
import { addItemErrorCreator } from './creators/addItemErrorCreator';

export const addItem: (text: string) => AddItemAction = addItemCreator(generateUuid);

export const saveItemText = (id: Guid, text: string): SaveItemTextAction => ({
  type: 'SAVE_ITEM_TEXT',
  payload: {
    id,
    text,
  },
});

export const deleteItemSuccess = (id: Guid, errorId: Guid): DeleteItemSuccessAction => ({
  type: 'DELETE_ITEM_SUCCESS',
  payload: {
    id,
    errorId,
  },
});

export const toggleItemEditing = (id: Guid): ToggleItemEditingAction => ({
  type: 'TOGGLE_ITEM_EDITING',
  payload: {
    id,
  },
});

export const setItemSyncing = (id: Guid, value: boolean): SetItemSyncingAction => ({
  type: 'SET_ITEM_SYNCING',
  payload: {
    id,
    value,
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

export const postItemSuccess = (oldId: Guid, newId: Guid, errorId: Guid): PostItemSuccessAction => ({
  type: 'POST_ITEM_SUCCESS',
  payload: {
    oldId,
    newId,
    errorId,
  },
});

export const addItemError: (itemId: Guid, error: string, action: ErrorAction) => AddItemErrorAction = addItemErrorCreator(generateUuid);

export const deleteItemError = (errorId: Guid): DeleteItemErrorAction => ({
  type: 'DELETE_ITEM_ERROR',
  payload: {
    errorId,
  },
});

export const putItemSuccess = (id: Guid, errorId: Guid): PutItemSuccessAction => ({
  type: 'PUT_ITEM_SUCCESS',
  payload: {
    id,
    errorId,
  },
});

export const cancelItemUpdating = (id: Guid, errorId: Guid): CancelItemUpdatingAction => ({
  type: 'CANCEL_ITEM_UPDATING',
  payload: {
    id,
    errorId,
  },
});
