import { IAction } from './IAction';
import { IItem } from '../../models/Item';

export interface AddItemAction extends IAction<'ADD_ITEM', {id: Guid, text: string}> {}
export interface SaveItemTextAction extends IAction<'SAVE_ITEM_TEXT', {id: Guid, text: string}> {}
export interface ToggleItemEditingAction extends IAction<'TOGGLE_ITEM_EDITING', {id: Guid}> {}
export interface SetItemSyncingAction extends IAction<'SET_ITEM_SYNCING', {id: Guid, value: boolean}> {}
export interface DisplayErrorAction extends IAction<'DISPLAY_ERROR', {error: string}> {}
export interface AddItemErrorAction extends IAction<'ADD_ITEM_ERROR', {itemId: Guid, errorId: Guid, error: string, action: ErrorAction}> {}
export interface DeleteItemErrorAction extends IAction<'DELETE_ITEM_ERROR', {errorId: Guid}> {}
export interface LoadingItemsSuccessAction extends IAction<'LOADING_ITEMS_SUCCESS', {response: IItem[]}> {}
export interface PostItemSuccessAction extends IAction<'POST_ITEM_SUCCESS', {oldId: Guid, newId: Guid, errorId: Guid}> {}
export interface PutItemSuccessAction extends IAction<'PUT_ITEM_SUCCESS', {id: Guid, errorId: Guid}> {}
export interface DeleteItemSuccessAction extends IAction<'DELETE_ITEM_SUCCESS', {id: Guid, errorId: Guid}> {}
export interface CancelItemUpdatingAction extends IAction<'CANCEL_ITEM_UPDATING', {id: Guid, errorId: Guid}> {}

export type Actions =
  | AddItemAction
  | SaveItemTextAction
  | DeleteItemSuccessAction
  | ToggleItemEditingAction
  | SetItemSyncingAction
  | DisplayErrorAction
  | AddItemErrorAction
  | DeleteItemErrorAction
  | LoadingItemsSuccessAction
  | PostItemSuccessAction
  | PutItemSuccessAction
  | CancelItemUpdatingAction;
