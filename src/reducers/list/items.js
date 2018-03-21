import { OrderedMap } from 'immutable';

import { Item } from '../../models/item';
import { item } from './item';
import { saveItems } from './itemsActions';
import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_SAVE,
  ITEM_SAVE_ALL,
  ITEM_DELETE_ALL,
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

    case ITEM_DELETE:
      return state.delete(action.payload.itemKey);

    case ITEM_SAVE:
    case ITEM_EDITING_START:
    case ITEM_EDITING_STOP:
    case ITEM_VALUE_CHANGED:
      return state.mergeIn([action.payload.itemKey], item(state.get(action.payload.itemKey), action));

    case ITEM_SAVE_ALL:
      return saveItems(state, action.payload.selectedKeys);

    case ITEM_DELETE_ALL:
      return action.payload.selectedKeys.reduce((newState, key) => newState.delete(key), state);

    default:
      return state;
  }
};
