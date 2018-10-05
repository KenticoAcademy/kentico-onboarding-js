import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import {
  ADD_ITEM,
  STOP_EDITING,
  DELETE_ITEM,
  START_EDITING,
  UPDATE_TEXT
} from '../../constants/actionTypes';
import { item } from './item';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = new ListItem({
        id: action.payload.id,
        text: action.payload.text
      });

      return state.set(action.payload.id, newItem);
    }

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case START_EDITING:
    case STOP_EDITING:
    case UPDATE_TEXT: {
      return state.mergeIn([action.payload.id], item(state.get(action.payload.id), action));
    }

    default:
      return state;
  }
};
