import { OrderedMap } from 'immutable';

import { ToDoItem } from '../models/toDoItem';
import { ListItem } from '../models/listItem';
import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_EDITING,
  ITEM_SAVE,
  ITEM_VALUE_CHANGED,
  ITEM_EDITING_STOP,
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

    case ITEM_EDITING:
      return state.mergeIn([action.item.todo.key, 'isBeingEdited'], !action.item.isBeingEdited);

    case ITEM_EDITING_STOP:
      return stopEditing(state, action.itemKey);

    case ITEM_VALUE_CHANGED:
      return state.mergeIn([action.itemKey, 'changedValue'], action.changedItemValue);

    default:
      return state;
  }
};

const stopEditing = (state, key) => {
  const todo = state.get(key).todo;

  return state.mergeIn([key], {
    'isBeingEdited': false,
    'changedValue': todo.value,
  });
};

const addItem = (state, value) => {
  const key = getIdentifier();
  const todo = new ToDoItem({
    key,
    value,
  });

  return state.set(key, new ListItem({
    todo,
    changedValue: value,
    isBeingEdited: false,
  }));
};

const saveItem = (state, key, updatedValue) => {
  const toDo = state.get(key).todo;

  return state.mergeIn([key], {
    'todo': toDo.merge({ 'value': updatedValue }),
    'changedValue': updatedValue,
    'isBeingEdited': false,
  });
};
