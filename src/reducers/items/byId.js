import { OrderedMap } from 'immutable';
import { Item } from '../../models/Item.ts';
import {
  ADD_ITEM,
  UPDATE_ITEM_TEXT,
  DELETE_ITEM,
  TOGGLE_EDITING,
  TEXT_UPDATE_CHANGE,
} from '../../constants/actionTypes.ts';

export const byId = (state = new OrderedMap(), action) => {
  switch (action.type) {

    case ADD_ITEM:
      return state.set(action.payload.id, new Item({
        id: action.payload.id,
        text: action.payload.text,
      }));

    case UPDATE_ITEM_TEXT:
      return state.update(action.payload.id, (item) => item.merge({
        text: item.textUpdate,
        isBeingEdited: false,
      }));

    case DELETE_ITEM: {
      return state.delete(action.payload.id);
    }

    case TOGGLE_EDITING: {
      return state.update(action.payload.id, (item) => item.merge({
        isBeingEdited: !item.isBeingEdited,
        textUpdate: item.text,
      }));
    }

    case TEXT_UPDATE_CHANGE: {
      return state.update(action.payload.id, (item) => item.merge({
        textUpdate: action.payload.updatedText,
      }));
    }

    default:
      return state;
  }
};
