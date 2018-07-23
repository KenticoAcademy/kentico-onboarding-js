import { OrderedMap } from 'immutable';
import * as ActionType from '../actions/ActionTypes';
import { ListItem } from '../models/ListItem';

export const list = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ActionType.AddItem:
      return state.set(action.payload.id, new ListItem({
        id: action.payload.id,
        text: action.payload.text
      }));
    case ActionType.EditItem:
      return state.mergeIn([action.payload.id], { text: action.payload.text });
    case ActionType.DeleteItem:
      return state.delete(action.payload.id);
    default:
      return state;
  }
};
