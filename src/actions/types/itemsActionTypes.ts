import { IAction } from './IAction';
import { IItem } from '../../models/Item';

export interface AddItemAction extends IAction<'ADD_ITEM', {id: Guid, text: string}> {}
export interface SaveItemTextAction extends IAction<'SAVE_ITEM_TEXT', {id: Guid, text: string}> {}
export interface DeleteItemAction extends IAction<'DELETE_ITEM', {id: Guid}> {}
export interface ToggleItemEditingAction extends IAction<'TOGGLE_ITEM_EDITING', {id: Guid}> {}
export interface DisplayErrorAction extends IAction<'DISPLAY_ERROR', {error: string}> {}
export interface DisplayItemErrorAction extends IAction<'DISPLAY_ITEM_ERROR', {id: Guid, error: string}> {}
export interface LoadingItemsSuccessAction extends IAction<'LOADING_ITEMS_SUCCESS', {response: IItem[]}> {}
export interface PostItemSuccessAction extends IAction<'POST_ITEM_SUCCESS', {oldId: Guid, newId: Guid, text: string}> {}
export interface PutItemSuccessAction extends IAction<'PUT_ITEM_SUCCESS', {id: Guid}> {}

export type Actions =
  | AddItemAction
  | SaveItemTextAction
  | DeleteItemAction
  | ToggleItemEditingAction
  | DisplayErrorAction
  | DisplayItemErrorAction
  | LoadingItemsSuccessAction
  | PostItemSuccessAction
  | PutItemSuccessAction;
