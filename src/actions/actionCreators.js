import {
  STOP_EDITING,
  DELETE_ITEM,
  UPDATE_TEXT,
  START_EDITING
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

export const startEditing = (id) => ({
  type: START_EDITING,
  payload: {
    id
  }
});

export const stopEditing = (id) => ({
  type: STOP_EDITING,
  payload: {
    id
  }
});
