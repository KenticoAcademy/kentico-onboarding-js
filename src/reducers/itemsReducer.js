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

export const initialState = getInitialItems();

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_CREATED:
      return (
        state
          .set(action.id, new ItemRecord({
            id: action.id,
            text: action.text,
          }))
      );
    case ITEM_EDITED:
      return (
        state
          .setIn([action.id, 'text'], action.text)
      );
    case ITEM_DELETED:
      return (
        state
          .filter(item => item.id !== action.id)
      );
    default:
      return state;
  }
};

export default itemsReducer;
