import {
  ITEM_SAVE,
  ITEM_SAVE_ALL,
  ITEM_DELETE,
} from '../../constants/actionTypes';

export const saveItem = (itemKey, updatedValue) => ({
  type: ITEM_SAVE,
  payload: {
    itemKey,
    updatedValue,
  },
});

export const saveItems = (selectedKeys) => ({
  type: ITEM_SAVE_ALL,
  payload: {
    selectedKeys,
  },
});

export const deleteItem = (itemKey) => ({
  type: ITEM_DELETE,
  payload: {
    itemKey,
  },
});
