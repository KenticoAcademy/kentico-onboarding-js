import { OrderedSet } from 'immutable';

import { IAction } from '../actions/IAction';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  DELETE_ITEM,
  ITEM_POST_SUCCESS,
  ITEMS_FETCHING_SUCCESS
} from '../actions/actionTypes';
import { Item } from '../models/Item';

export const itemsOrderReducer = (state = OrderedSet<string>(), action: IAction): OrderedSet<string> => {
  switch (action.type) {
    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case POSITIVELY_CREATE_ITEM_LOCALLY:
      return state.add(action.payload.ueid);

    case ITEMS_FETCHING_SUCCESS:
      return OrderedSet<string>(
        action.payload.items
          .map((item: Item) => item.id)
      );

    case ITEM_POST_SUCCESS:
      return state
        .delete(action.payload.item.ueid)
        .add(action.payload.item.id);

    default:
      return state;
  }
};
