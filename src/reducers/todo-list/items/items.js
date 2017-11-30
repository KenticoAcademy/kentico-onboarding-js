import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
} from '../../../constants/actionTypes';
import { item } from './item';

export const items = (previousState = OrderedMap(), action) => {
  switch (action.type) {
    case TODO_LIST_ITEM_DELETE:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_INSERT:
    case TODO_LIST_ITEM_UPDATE:
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT: {
      const existingItem = previousState.get(action.payload.id);
      const updatedItem = item(existingItem, action);

      return previousState.set(
        updatedItem.id,
        updatedItem,
      );
    }

    default:
      return previousState;
  }
};
