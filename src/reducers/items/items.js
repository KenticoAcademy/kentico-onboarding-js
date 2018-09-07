import { OrderedMap } from 'immutable';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
} from '../../actions/actionTypes';
import { item } from './item';

export const items = (state = OrderedMap(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
    case EDIT_ITEM:
      return (
        state.set(action.payload.id,
          item(state, action))
      );

    case DELETE_ITEM:
      return (
        state.delete(action.payload.id)
      );

    default:
      return state;
  }
};
