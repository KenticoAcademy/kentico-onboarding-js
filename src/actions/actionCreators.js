import {
  CANCEL_EDIT,
  DELETE_ITEM,
  UPDATE_TEXT,
  START_EDIT
} from '../constants/actionTypes';

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: {
    id
  }
});

export const updateText = (id, text) => ({
  type: UPDATE_TEXT,
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
