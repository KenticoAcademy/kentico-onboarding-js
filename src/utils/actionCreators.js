import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM_TEXT,
  TOGGLE_EDITING,
} from '../constants/actionTypes';

export const addItem = (id, text) => {
  return {
    type: ADD_ITEM,
    text,
    id,
  };
};

export const deleteItem = id => {
  return {
    type: DELETE_ITEM,
    id,
  };
};

export const toggleEditing = (id, isBeingEdited) => {
  return {
    type: TOGGLE_EDITING,
    id,
    isBeingEdited,
  };
};

export const updateItemText = (id, newText) => {
  return {
    type: UPDATE_ITEM_TEXT,
    newText,
    id,
  };
};
