import { OrderedMap } from 'immutable';
import * as ActionType from '../actions/ActionTypes';
import { item } from './item';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ActionType.AddItem:
      return state.set(action.payload.id, item(null, action));

    case ActionType.SaveItem:
    case ActionType.ToggleItem: {
      const existingItem = state.get(action.payload.id);
      const editedItem = item(existingItem, action);
      return state.set(action.payload.id, editedItem);
    }

    case ActionType.DeleteItem:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};
