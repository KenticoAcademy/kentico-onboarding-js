import { Map } from 'immutable';

import { IAction } from '../actions/IAction';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM, ITEM_POST_FAILED,
  ITEM_POST_SUCCESS,
  ITEMS_FETCHING_SUCCESS,
  TOGGLE_ITEM_VIEW_MODE
} from '../actions/actionTypes';
import { ItemFlags } from '../models/ItemFlags';
import { itemFlagsReducer } from './itemFlagsReducer';
import { Item } from '../models/Item';

export const itemsFlagReducer = (state = Map<string, ItemFlags>(), action: IAction): Map<string, ItemFlags> => {
  switch (action.type) {
    case EDIT_ITEM:
    case TOGGLE_ITEM_VIEW_MODE:
      return state.set(action.payload.id, itemFlagsReducer(state.get(action.payload.id), action));

    case CREATE_ITEM:
      return state.set(action.payload.ueid, itemFlagsReducer(undefined, action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case ITEMS_FETCHING_SUCCESS:
      return Map<string, ItemFlags>(
        action.payload.items
          .map((item: Item) => [item.id, itemFlagsReducer(undefined, action)])
      );

    case ITEM_POST_SUCCESS:
      const itemFlags = itemFlagsReducer(undefined, action);
      return state
        .delete(action.payload.item.guid)
        .set(action.payload.item.id, itemFlags);

    case ITEM_POST_FAILED:
      const ueid = action.payload.ueid;
      return state
        .set(ueid, itemFlagsReducer(state.get(ueid), action));

    default:
      return state;
  }
};
