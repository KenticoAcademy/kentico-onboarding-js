import { OrderedMap } from 'immutable';

import { Item } from '../../models/item';
import { item } from './item';
import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_SAVE,
  ITEM_VALUE_CHANGED,
  ITEM_EDITING_STOP,
  ITEM_EDITING_START,
} from '../../constants/actionTypes';
import { getIdentifier } from '../../utils/uuidService';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return addItem(state, action.payload.newValue);

    case ITEM_SAVE:
      return state.mergeIn([action.payload.itemKey], {
        value: action.payload.newValue,
        temporaryValue: action.payload.newValue,
        isBeingEdited: false,
      });

    case ITEM_DELETE:
      return state.delete(action.payload.itemKey);

    case ITEM_EDITING_START:
    case ITEM_EDITING_STOP:
    case ITEM_VALUE_CHANGED:
      return state.mergeIn([action.payload.itemKey], item(state.get(action.payload.itemKey), action));

    default:
      return state;
  }
};

const addItem = (state, value) => {
  const key = getIdentifier();

  return state.set(key, new Item({
    key,
    value,
    temporaryValue: value,
    isBeingEdited: false,
  }));
};
