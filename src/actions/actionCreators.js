import { generateId } from '../utils/generateId';
import {
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM
} from './actionTypes';

export const createItem = (text) => ({
  type: CREATE_ITEM,
  payload: {
    id: generateId(),
    text,
  }
});

export const editItem = (id, text) => ({
  type: EDIT_ITEM,
  payload: {
    id,
    text,
  }
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: {
    id,
  }
});
