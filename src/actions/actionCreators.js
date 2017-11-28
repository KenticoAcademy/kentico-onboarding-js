import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM_TEXT,
  TOGGLE_EDITING,
  UPDATE_NEW_ITEM_TEXT,
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

export const deleteItem = id => {
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
      newText,
      id,
    },
  };
};

export const updateNewItemText = (newItemText) => {
  return {
    type: UPDATE_NEW_ITEM_TEXT,
    payload: { newItemText },
  };
};
