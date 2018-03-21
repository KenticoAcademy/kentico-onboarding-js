import {
  ITEM_SAVE,
  ITEM_DELETE,
  ITEM_SAVE_ALL,
  ITEM_DELETE_ALL,
} from '../../constants/actionTypes';

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

export const saveItems = (selectedKeys) => ({
  type: ITEM_SAVE_ALL,
  payload: {
    selectedKeys,
  },
});

export const deleteItems = (selectedKeys) => ({
  type: ITEM_DELETE_ALL,
  payload: {
    selectedKeys,
  },
});
