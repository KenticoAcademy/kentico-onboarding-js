import { OrderedMap } from 'immutable';
import {
  ITEM_CREATED,
  ITEM_EDITED,
  ITEM_DELETED,
} from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';

export const initialState = {
  items: OrderedMap({})
};

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_CREATED:
      return {
        // INFO: there could by problem with more variables in the state in the future - "items: state.items"
        // -> fix by Immutable.Map?
        items: state.items
          .set(action.id, new ItemRecord({
            id: action.id,
            text: action.text,
          }))
      };
    case ITEM_EDITED:
      return {
        items: state.items
          .setIn([action.id, 'text'], action.text)
      };
    case ITEM_DELETED:
      return {
        items: state.items
          .filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};
