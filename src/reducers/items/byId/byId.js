import {
  ADD_ITEM,
  UPDATE_ITEM_TEXT,
  DELETE_ITEM,
  TOGGLE_EDITING,
} from '../../../constants/actionTypes';
import { OrderedMap } from 'immutable';
import { Item } from '../../../models/Item';

export const byId = (state = new OrderedMap(), action) => {
  switch (action.type) {

    case ADD_ITEM:
      return state.set(action.id, new Item({
        id: action.id,
        text: action.text,
        isBeingEdited: false,
      }));

    case UPDATE_ITEM_TEXT:
      return state.update(action.id, (item) => item.merge({
        text: action.newText,
        isBeingEdited: false,
      }));

    case DELETE_ITEM: {
      return state.delete(action.id);
    }

    case TOGGLE_EDITING: {
      return state.update(action.id, (item) => item.merge({
        isBeingEdited: !item.isBeingEdited,
      }));
    }

    default:
      return state;
  }
};
