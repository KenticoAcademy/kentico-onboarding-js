import { Map } from 'immutable';

import { IAction } from '../../actions/IAction';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  DELETE_ITEM,
  EDIT_ITEM, ITEM_SAVE_FAILED,
  ITEM_SAVE_SUCCEED,
  ITEMS_FETCHING_SUCCEED,
  TOGGLE_ITEM_VIEW_MODE
} from '../../actions/actionTypes';
import { ItemFlags } from '../../models/ItemFlags';
import { itemFlagsReducer } from './itemFlagsReducer';
import { Item } from '../../models/Item';

export const itemFlagsMapReducer = (state = Map<string, ItemFlags>(), action: IAction): Map<string, ItemFlags> => {
  switch (action.type) {
    case EDIT_ITEM:
    case TOGGLE_ITEM_VIEW_MODE:
      return state.set(action.payload.id, itemFlagsReducer(state.get(action.payload.id), action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case ITEMS_FETCHING_SUCCEED:
      return Map<string, ItemFlags>(
        action.payload.items
          .map((item: Item) => [item.id, itemFlagsReducer(undefined, action)])
      );

    case POSITIVELY_CREATE_ITEM_LOCALLY:
      return state.set(action.payload.ueid, itemFlagsReducer(undefined, action));

    case ITEM_SAVE_SUCCEED:
      const itemFlags = itemFlagsReducer(state.get(action.payload.ueid), action);
      return state
        .delete(action.payload.item.ueid)
        .set(action.payload.item.id, itemFlags);

    case ITEM_SAVE_FAILED:
      return state.delete(action.payload.itemUeid);

    default:
      return state;
  }
};
