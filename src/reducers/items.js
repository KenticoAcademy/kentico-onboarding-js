import { OrderedMap } from 'immutable';

import { ToDoItem } from '../models/toDoItem';
import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_EDITING,
  ITEM_SAVE,
} from '../utils/constants';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return state.set(action.item.key, new ToDoItem({
        key: action.item.key,
        value: action.item.value,
        isBeingEdited: false,
      }));

    case ITEM_SAVE:
      return state.mergeIn([action.item.key], {
        'value': action.newItemValue,
        'isBeingEdited': !action.item.isBeingEdited,
      });

    case ITEM_DELETE:
      return state.delete(action.item.key);

    case ITEM_EDITING:
      return state.mergeIn([action.item.key, 'isBeingEdited'], !action.item.isBeingEdited);

    default:
      return state;
  }
};
