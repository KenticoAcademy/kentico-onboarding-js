import { OrderedMap } from 'immutable';

import { ToDo } from '../models/toDo';
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
      return saveItem(state, action.itemKey, action.updatedValue);

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
  const todo = state.get(key).todo;

  return state.mergeIn([key], {
    isBeingEdited: false,
    changeableValue: todo.value,
  });
};

const addItem = (state, value) => {
  const key = getIdentifier();
  const todo = new ToDo({
    key,
    value,
  });

  return state.set(key, new Item({
    todo,
    changeableValue: value,
    isBeingEdited: false,
  }));
};

const saveItem = (state, key, updatedValue) => {
  const toDo = state.get(key).todo;

  return state.mergeIn([key], {
    todo: toDo.merge({ value: updatedValue }),
    changeableValue: updatedValue,
    isBeingEdited: false,
  });
};
