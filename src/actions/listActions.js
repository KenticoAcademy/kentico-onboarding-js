import {
  ITEM_ADD,
  ITEM_SAVE,
  ITEM_DELETE,
} from '../utils/constants';

export const addItem = (newValue) => ({
  type: ITEM_ADD,
  payload: {
    newValue,
  },
});

export const saveItem = (itemKey, updatedValue) => ({
  type: ITEM_SAVE,
  payload: {
    itemKey,
    newValue: updatedValue,
  },
});

export const deleteItem = (itemKey) => ({
  type: ITEM_DELETE,
  payload: {
    itemKey,
  },
});
