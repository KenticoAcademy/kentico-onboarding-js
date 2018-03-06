import { OrderedMap } from 'immutable';

import { ToDoItem } from '../models/toDoItem';
import { ITEM_ADD } from '../utils/constants';

export const items = (state = OrderedMap(), action) => {
  // const { item: { key, value } } = action;
  switch (action.type) {
    case ITEM_ADD:
      return state.set(action.item.key, new ToDoItem({
        key: action.item.key,
        value: action.item.value,
      }));
    default:
      return state;
  }
};
