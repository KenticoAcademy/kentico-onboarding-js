import {
  ITEM_ADD,
  ITEM_SAVE,
  ITEM_DELETE,
} from '../utils/constants';

export const addItem = (updatedValue) => ({
  type: ITEM_ADD,
  updatedValue,
});

export const saveItem = (itemKey, updatedValue) => ({
  type: ITEM_SAVE,
  itemKey,
  updatedValue,
});

export const deleteItem = (itemKey) => ({
  type: ITEM_DELETE,
  itemKey,
});
