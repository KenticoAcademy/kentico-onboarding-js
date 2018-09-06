import { OrderedMap } from 'immutable';
import {
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
} from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';

export const initialState = new OrderedMap({});

export const items = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return (
        state
          .set(action.payload.id,
            new ItemRecord({
              id: action.payload.id,
              text: action.payload.text,
            }))
      );
    case EDIT_ITEM:
      return (
        state
          .setIn([action.payload.id, 'text'], action.payload.text)
      );
    case DELETE_ITEM:
      return (
        state
          .filter(item => item.id !== action.payload.id)
      );
    default:
      return state;
  }
};
