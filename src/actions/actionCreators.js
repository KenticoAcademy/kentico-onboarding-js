import {
  ITEM_STOP_EDITING,
  ITEM_DELETE,
  ITEM_TEXT_UPDATE,
  ITEM_START_EDITING
} from '../constants/actionTypes';

export const deleteItem = (id) => ({
  type: ITEM_DELETE,
  payload: {
    id
  }
});

export const updateItemText = (id, text) => ({
  type: ITEM_TEXT_UPDATE,
  payload: {
    id,
    text
  }
});

export const startItemEditing = (id) => ({
  type: ITEM_START_EDITING,
  payload: {
    id
  }
});

export const stopItemEditing = (id) => ({
  type: ITEM_STOP_EDITING,
  payload: {
    id
  }
});
