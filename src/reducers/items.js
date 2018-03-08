import { OrderedMap } from 'immutable';

import { ToDoItem } from '../models/toDoItem';
import { ListItem } from '../models/listItem';
import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_EDITING,
  ITEM_SAVE,
  ITEM_VALUE_CHANGED,
} from '../utils/constants';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return addItem(state, action.item.key, action.item.value);

    case ITEM_SAVE:
      return saveItem(state, action.item.todo.key, action.newItemValue);

    case ITEM_DELETE:
      return state.delete(action.item.todo.key);

    case ITEM_EDITING:
      return state.mergeIn([action.item.todo.key, 'isBeingEdited'], !action.item.isBeingEdited);

    case ITEM_VALUE_CHANGED:
      return state.mergeIn([action.item.todo.key, 'changedValue'], action.changedItemValue);

    default:
      return state;
  }
};

const addItem = (state, key, value) => {
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
