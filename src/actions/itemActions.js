import {
  ITEM_EDITING_START,
  ITEM_EDITING_STOP,
  ITEM_VALUE_CHANGED,
} from '../utils/constants';

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
