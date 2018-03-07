import {
  ITEM_ADD,
  ITEM_EDITING,
} from '../utils/constants';

export const addItem = (newItemKey, newItemValue) => ({
  type: ITEM_ADD,
  item: {
    key: newItemKey,
    value: newItemValue,
  },
});

export const toggleItemEditing = (newItemKey, newItemValue) => ({
  type: ITEM_EDITING,
  item: {
    key: newItemKey,
    value: newItemValue,
  },
});
