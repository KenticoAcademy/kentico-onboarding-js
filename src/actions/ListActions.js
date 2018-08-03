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

export const toggleItem = (id) => ({
  type: ActionType.ToggleItem,
  payload: {
    id
  }
});

export const deleteItem = (id) => ({
  type: ActionType.DeleteItem,
  payload: {
    id
  }
});
