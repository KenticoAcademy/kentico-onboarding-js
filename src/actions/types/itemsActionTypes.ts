import { IAction } from './IAction';
import { IItem } from '../../models/Item';

export interface AddItemAction extends IAction<'ADD_ITEM', {id: Guid, text: string}> {}
export interface SaveItemTextAction extends IAction<'SAVE_ITEM_TEXT', {id: Guid, text: string}> {}
export interface DeleteItemAction extends IAction<'DELETE_ITEM', {id: Guid}> {}
export interface ToggleItemEditingAction extends IAction<'TOGGLE_ITEM_EDITING', {id: Guid}> {}
export interface FetchFailureAction extends IAction<'FETCH_ERROR', {error: string}> {}
export interface FetchItemsSuccessAction extends IAction<'FETCH_ITEMS_SUCCESS', {response: IItem[]}> {}

export type Actions =
  | AddItemAction
  | SaveItemTextAction
  | DeleteItemAction
  | ToggleItemEditingAction
  | FetchFailureAction
  | FetchItemsSuccessAction;
