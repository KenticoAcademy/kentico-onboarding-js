import { OrderedSet } from 'immutable';

import { IAction } from '../../actions/IAction';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  DELETE_ITEM,
  ITEM_SAVE_SUCCEED,
  ITEMS_FETCHING_SUCCEED,
  ITEM_SAVE_FAILED,
} from '../../actions/actionTypes';
import { Item } from '../../models/Item';

export const itemsOrderReducer = (state = OrderedSet<string>(), action: IAction): OrderedSet<string> => {
  switch (action.type) {
    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case POSITIVELY_CREATE_ITEM_LOCALLY:
      return state.add(action.payload.ueid);

    case ITEMS_FETCHING_SUCCEED:
      return OrderedSet<string>(
        action.payload.items
          .map((item: Item) => item.id)
      );

    case ITEM_SAVE_SUCCEED:
      return state.map(id => id === action.payload.item.ueid ? action.payload.item.id : id).toOrderedSet();

    case ITEM_SAVE_FAILED:
      return state.delete(action.payload.itemUeid);

    default:
      return state;
  }
};
