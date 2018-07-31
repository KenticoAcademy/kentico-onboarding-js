import * as ActionType from './ActionTypes';
import { guid } from '../utils/guid';
import { addItemCreator } from './addItemCreator';
import { IAction } from '../interfaces/IAction';

export const addItem = addItemCreator(guid);

export const saveItem = (id: string, text: string): IAction => ({
  type: ActionType.SaveItem,
  payload: {
    id,
    text
  }
});

export const toggleItem = (id: string): IAction => ({
  type: ActionType.ToggleItem,
  payload: {
    id
  }
});

export const deleteItem = (id: string): IAction => ({
  type: ActionType.DeleteItem,
  payload: {
    id
  }
});
