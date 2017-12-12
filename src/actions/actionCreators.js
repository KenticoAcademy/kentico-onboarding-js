import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM_TEXT,
  TOGGLE_EDITING,
  UPDATE_NEW_ITEM_TEXT,
  TEXT_UPDATE_CHANGE,
} from '../constants/actionTypes';

export const addItem = (id, text) => {
  return {
    type: ADD_ITEM,
    payload: {
      text,
      id,
    },
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: { id },
  };
};

export const toggleEditing = (id) => {
  return {
    type: TOGGLE_EDITING,
    payload: { id },
  };
};

export const updateItemText = (id, newText) => {
  return {
    type: UPDATE_ITEM_TEXT,
    payload: {
      id,
      newText,
    },
  };
};

export const updateNewItemText = (newItemText) => {
  return {
    type: UPDATE_NEW_ITEM_TEXT,
    payload: { newItemText },
  };
};

export const textUpdateChange = (id, updatedText) => {
  return {
    type: TEXT_UPDATE_CHANGE,
    payload: {
      id,
      updatedText },
  };
};
