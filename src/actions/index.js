import {
  ADD_ITEM,
  CANCEL_EDIT,
  DELETE_ITEM,
  SAVE_ITEM,
  START_EDIT
} from '../constants/actionTypes';
import { generateId } from '../utils/idGenerator';

const addItemWithDI = (generateIdFunction) => (text) => ({
  type: ADD_ITEM,
  payload: {
    id: generateIdFunction(),
    text,
  }
});

export const addItem = addItemWithDI(generateId);

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: {
    id
  }
});

export const saveItem = (id, text) => ({
  type: SAVE_ITEM,
  payload: {
    id,
    text
  }
});

export const startEdit = (id) => ({
  type: START_EDIT,
  payload: {
    id
  }
});

export const cancelEdit = (id) => ({
  type: CANCEL_EDIT,
  payload: {
    id
  }
});
