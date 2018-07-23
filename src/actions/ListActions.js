import * as ActionType from '../actions/ActionTypes';
import { guid } from '../utils/guid';
import { addItemCreator } from './addItemCreator';

export const addItem = addItemCreator(guid);

export const editItem = (id, text) => ({
  type: ActionType.EditItem,
  payload: {
    id,
    text
  }
});

export const deleteItem = (id) => ({
  type: ActionType.DeleteItem,
  payload: {
    id
  }
});
