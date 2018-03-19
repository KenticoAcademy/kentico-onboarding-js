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

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return state.set(action.payload.itemKey, new Item({
        key: action.payload.itemKey,
        value: action.payload.newValue,
        temporaryValue: action.payload.newValue,
        isBeingEdited: false,
      }));

    case ITEM_SAVE:
      return state.mergeIn([action.payload.itemKey], {
        value: action.payload.updatedValue,
        temporaryValue: action.payload.updatedValue,
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
