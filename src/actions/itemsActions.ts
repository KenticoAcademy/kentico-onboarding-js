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
import { IError } from '../models/Error';

export const addItem = (id: Guid, text: string): AddItemAction => ({
  type: 'ADD_ITEM',
  payload: {
    id,
    text,
  },
});

export const saveItemText = (id: Guid, text: string): SaveItemTextAction => ({
  type: 'SAVE_ITEM_TEXT',
  payload: {
    id,
    text,
  },
});

export const deleteItemSuccess = (id: Guid): DeleteItemSuccessAction => ({
  type: 'DELETE_ITEM_SUCCESS',
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

export const loadingItemsSuccess = (response: ReadonlyArray<IItem>): LoadingItemsSuccessAction => ({
  type: 'LOADING_ITEMS_SUCCESS',
  payload: {
    response,
  },
});

export const postItemSuccess = (oldId: Guid, newId: Guid): PostItemSuccessAction => ({
  type: 'POST_ITEM_SUCCESS',
  payload: {
    oldId,
    newId,
  },
});

export const addItemError = (itemId: Guid, error: IError): AddItemErrorAction => ({
  type: 'ADD_ITEM_ERROR',
  payload: {
    itemId,
    error,
  },
});

export const deleteItemError = (errorId: Guid): DeleteItemErrorAction => ({
  type: 'DELETE_ITEM_ERROR',
  payload: {
    errorId,
  },
});

export const putItemSuccess = (id: Guid): PutItemSuccessAction => ({
  type: 'PUT_ITEM_SUCCESS',
  payload: {
    id,
  },
});

export const cancelItemUpdating = (id: Guid, oldText: string): CancelItemUpdatingAction => ({
  type: 'CANCEL_ITEM_UPDATING',
  payload: {
    id,
    oldText,
  },
});
