import {
  ITEM_CREATED,
  ITEM_EDITED,
  ITEM_DELETED,
} from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';
import { getInitialItems } from '../utils/getInitialItems';

// export const initialState = {
//   items: OrderedMap({})
// };

export const initialState = { items: getInitialItems };

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_CREATED:
      return {
        ...state,
        items: state.items
          .set(action.id, new ItemRecord({
            id: action.id,
            text: action.text,
          }))
      };
    case ITEM_EDITED:
      return {
        ...state,
        items: state.items
          .setIn([action.id, 'text'], action.text)
      };
    case ITEM_DELETED:
      return {
        ...state,
        items: state.items
          .filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};
