import {
  ITEM_EDITING_START,
  ITEM_EDITING_STOP,
  ITEM_VALUE_CHANGED,
} from '../constants/actionTypes';

export const startItemEditing = (itemKey) => ({
  type: ITEM_EDITING_START,
  payload: {
    itemKey,
  },
});

export const stopItemEditing = (itemKey) => ({
  type: ITEM_EDITING_STOP,
  payload: {
    itemKey,
  },
});

export const changeItemValue = (itemKey, updatedValue) => ({
  type: ITEM_VALUE_CHANGED,
  payload: {
    itemKey,
    newValue: updatedValue,
  },
});
