import * as ActionType from '../actions/ActionTypes';
import { guid } from '../utils/guid';
import { addItemCreator } from './addItemCreator';

export const addItem = addItemCreator(guid);

export const saveItem = (id, text) => ({
  type: ActionType.SaveItem,
  payload: {
    id,
    text
  }
});

export const toggleItem = (id, isActive) => ({
  type: ActionType.ToggleItem,
  payload: {
    id,
    isActive
  }
});

export const deleteItem = (id) => ({
  type: ActionType.DeleteItem,
  payload: {
    id
  }
});
