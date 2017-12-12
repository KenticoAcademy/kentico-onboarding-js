import {
  ITEM_CHANGES_SAVED,
  ITEM_CHANGES_CANCELED,
  ITEM_DELETED,
  ITEM_OPENED_FOR_EDITING,
} from '../constants/actionTypes';

export const openItemForEditing = (itemId) => {
  return {
    type: ITEM_OPENED_FOR_EDITING,
    payload: {
      itemId,
    },
  };
};

export const deleteItem = (itemId) => {
  return {
    type: ITEM_DELETED,
    payload: {
      itemId,
    },
  };
};

export const saveItemChanges = (itemId, newText) => {
  return {
    type: ITEM_CHANGES_SAVED,
    payload: {
      itemId,
      newText,
    },
  };
};

export const cancelItemChanges = (itemId) => {
  return {
    type: ITEM_CHANGES_CANCELED,
    payload: {
      itemId,
    },
  };
};
