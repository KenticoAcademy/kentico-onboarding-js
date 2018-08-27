import * as ActionType from './ActionTypes';
import { guid } from '../utils/guid';
import { addItemCreator } from './addItemCreator';
import { IAction } from './IAction';

export const addItem = addItemCreator(guid);

export const saveItem = (id: Uuid, text: string): IAction => ({
  type: ActionType.SaveItem,
  payload: {
    id,
    text
  }
});

export const toggleItem = (id: Uuid): IAction => ({
  type: ActionType.ToggleItem,
  payload: {
    id
  }
});

export const deleteItem = (id: Uuid): IAction => ({
  type: ActionType.DeleteItem,
  payload: {
    id
  }
});
