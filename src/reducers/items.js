import { OrderedMap } from 'immutable';

import { Item } from '../models/item';
import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_SAVE,
  ITEM_VALUE_CHANGED,
  ITEM_EDITING_STOP,
  ITEM_EDITING_START,
} from '../utils/constants';
import { getIdentifier } from '../utils/uuidService';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return addItem(state, action.itemValue);

    case ITEM_SAVE:
      return state.mergeIn([action.itemKey], {
        value: action.updatedValue,
        changeableValue: action.updatedValue,
        isBeingEdited: false,
      });

    case ITEM_DELETE:
      return state.delete(action.itemKey);

    case ITEM_EDITING_START:
      return state.mergeIn([action.itemKey], { isBeingEdited: true });

    case ITEM_EDITING_STOP:
      return stopEditing(state, action.itemKey);

    case ITEM_VALUE_CHANGED:
      return state.mergeIn([action.itemKey], { changeableValue: action.updatedValue });

    default:
      return state;
  }
};

const stopEditing = (state, key) => {
  const item = state.get(key);

  return state.mergeIn([key], {
    changeableValue: item.value,
    isBeingEdited: false,
  });
};

const addItem = (state, value) => {
  const key = getIdentifier();

  return state.set(key, new Item({
    key,
    value,
    changeableValue: value,
    isBeingEdited: false,
  }));
};