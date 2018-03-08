import {
  ITEM_ADD,
  ITEM_SAVE,
  ITEM_DELETE,
  ITEM_EDITING,
} from '../utils/constants';

export const addItem = (newItemKey, newItemValue) => ({
  type: ITEM_ADD,
  item: {
    key: newItemKey,
    value: newItemValue,
  },
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
