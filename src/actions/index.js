import {
  ITEM_ADD,
  ITEM_SAVE,
  ITEM_DELETE,
  ITEM_VALUE_CHANGED,
  ITEM_EDITING_START,
  ITEM_EDITING_STOP,
} from '../utils/constants';

export const addItem = (itemValue) => ({
  type: ITEM_ADD,
  itemValue,
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

export const startItemEditing = (itemKey) => ({
  type: ITEM_EDITING_START,
  itemKey,
});

export const stopItemEditing = (itemKey) => ({
  type: ITEM_EDITING_STOP,
  itemKey,
});

export const changeItemValue = (itemKey, updatedValue) => ({
  type: ITEM_VALUE_CHANGED,
  itemKey,
  updatedValue,
});
