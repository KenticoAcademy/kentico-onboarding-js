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
