import {
  ADD_ITEM,
  UPDATE_ITEM_TEXT,
  DELETE_ITEM,
  TOGGLE_EDITING,
} from '../../../../constants/actionTypes';
import { OrderedMap } from 'immutable';

const items = (state = new OrderedMap(), action) => {
  switch (action.type) {

    case ADD_ITEM:
      return state.set(action.id, {
        id: action.id,
        text: action.text,
        isBeingEdited: false,
      });

    case UPDATE_ITEM_TEXT:
      return state.set(action.id, {
        id: action.id,
        text: action.newText,
        isBeingEdited: false,
      });

    case DELETE_ITEM: {
      return state.delete(action.id);
    }

    case TOGGLE_EDITING: {
      return state.set(action.id, {
        id: action.id,
        text: state.get(action.id).text,
        isBeingEdited: action.isBeingEdited,
      });
    }

    default:
      return state;
  }
};

export default items;
