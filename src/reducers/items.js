import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import {
  ADD_ITEM,
  CANCEL_EDIT,
  DELETE_ITEM,
  SAVE_ITEM,
  START_EDIT
} from '../constants/actionTypes';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return state.set(action.payload.id, new ListItem({
        id: action.payload.id,
        text: action.payload.text
      }));
    }
    case DELETE_ITEM:
      return state.delete(action.payload.id);
    case START_EDIT:
      return state.mergeIn([action.payload.id], { isInEditMode: true });
    case CANCEL_EDIT:
      return state.mergeIn([action.payload.id], { isInEditMode: false });
    case SAVE_ITEM: {
      return state.mergeIn([action.payload.id], new ListItem({
        id: action.payload.id,
        text: action.payload.text
      }));
    }
    default:
      return state;
  }
};
