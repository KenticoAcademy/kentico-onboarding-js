import { OrderedMap } from 'immutable';
import { Item } from '../../../models/Item';
import {
  ADD_ITEM,
  UPDATE_ITEM_TEXT,
  DELETE_ITEM,
  TOGGLE_EDITING,
} from '../../../constants/actionTypes';

export const byId = (state = new OrderedMap(), action) => {
  switch (action.type) {

    case ADD_ITEM:
      return state.set(action.payload.id, new Item({
        id: action.payload.id,
        text: action.payload.text,
      }));

    case UPDATE_ITEM_TEXT:
      return state.update(action.payload.id, (item) => item.merge({
        text: action.payload.newText,
        isBeingEdited: false,
      }));

    case DELETE_ITEM: {
      return state.delete(action.payload.id);
    }

    case TOGGLE_EDITING: {
      return state.update(action.payload.id, (item) => item.merge({
        isBeingEdited: !item.isBeingEdited,
      }));
    }

    default:
      return state;
  }
};
