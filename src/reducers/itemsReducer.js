import { OrderedMap } from 'immutable';
import {
  ITEM_CREATED,
  ITEM_EDITED,
  ITEM_DELETED,
} from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';

export const initialState = new OrderedMap({});

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_CREATED:
      return (
        state
          .set(action.payload.id, new ItemRecord({
            id: action.payload.id,
            text: action.payload.text,
          }))
      );
    case ITEM_EDITED:
      return (
        state
          .setIn([action.payload.id, 'text'], action.payload.text)
      );
    case ITEM_DELETED:
      return (
        state
          .filter(item => item.id !== action.payload.id)
      );
    default:
      return state;
  }
};

export default itemsReducer;
