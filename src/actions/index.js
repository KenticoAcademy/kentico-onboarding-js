import {
  ITEM_ADD,
  ITEM_SAVE,
  ITEM_DELETE,
  ITEM_EDITING,
  ITEM_VALUE_CHANGED,
} from '../utils/constants';

export const addItem = (itemValue) => ({
  type: ITEM_ADD,
  itemValue,
});

export const saveItem = (item, newItemValue) => ({
  type: ITEM_SAVE,
  item,
  newItemValue,
});

export const deleteItem = (item) => ({
  type: ITEM_DELETE,
  item,
});

export const toggleItemEditing = (item) => ({
  type: ITEM_EDITING,
  item,
});

export const changeItemValue = (item, changedItemValue) => ({
  type: ITEM_VALUE_CHANGED,
  item,
  changedItemValue,
});
