import {
  ITEM_SAVE,
  ITEM_DELETE,
} from '../constants/actionTypes';

export const saveItem = (itemKey, updatedValue) => ({
  type: ITEM_SAVE,
  payload: {
    itemKey,
    updatedValue,
  },
});

export const deleteItem = (itemKey) => ({
  type: ITEM_DELETE,
  payload: {
    itemKey,
  },
});
