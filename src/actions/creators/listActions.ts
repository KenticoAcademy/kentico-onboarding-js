import { Map } from 'immutable';

import {
  ITEM_SAVE,
  ITEM_DELETE,
  ITEM_SAVE_ALL,
  ITEM_DELETE_ALL,
  ITEM_EDITING_STOP_ALL,
} from '../../constants/actionTypes';
import { stopItemEditing } from '../itemActions/itemActions';

export const saveItem = (itemKey) => ({
  type: ITEM_SAVE,
  payload: {
    itemKey,
  },
});

export const saveItems = (selectedKeys) => ({
  type: ITEM_SAVE_ALL,
  payload: {
    actions: Map(selectedKeys.map(key => [key, saveItem(key)])),
  },
});

export const deleteItem = (itemKey) => ({
  type: ITEM_DELETE,
  payload: {
    itemKey,
  },
});

export const deleteItems = (selectedKeys) => ({
  type: ITEM_DELETE_ALL,
  payload: {
    selectedKeys,
  },
});

export const cancelItemsEditing = (selectedKeys) => ({
  type: ITEM_EDITING_STOP_ALL,
  payload: {
    actions: Map(selectedKeys.map(key => [key, stopItemEditing(key)])),
  },
});
