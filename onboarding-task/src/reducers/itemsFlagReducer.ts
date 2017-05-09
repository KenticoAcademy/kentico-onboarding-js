import { Map } from 'immutable';

import { IAction } from '../actions/IAction';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM, ITEM_POST_FAILED, RECEIVE_ITEM_CREATED,
  RECEIVE_ITEMS,
  TOGGLE_ITEM_VIEW_MODE
} from '../actions/actionTypes';
import { ItemFlags } from '../models/ItemFlags';
import { itemFlagsReducer } from './itemFlagsReducer';
import { Item } from '../models/Item';

const itemsFlagReducer = (state = Map<string, ItemFlags>(),
                          action: IAction,) => {
  switch (action.type) {
    case EDIT_ITEM:
    case TOGGLE_ITEM_VIEW_MODE:
      return state.set(action.payload.id, itemFlagsReducer(state.get(action.payload.id), action));

    case CREATE_ITEM:
      return state.set(action.payload.ueid, itemFlagsReducer(new ItemFlags(), action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case RECEIVE_ITEMS:
      return Map<string, ItemFlags>(
        action.payload.items
          .map((item: Item) => [item.id, itemFlagsReducer(new ItemFlags(), action) as ItemFlags])
      );

    case RECEIVE_ITEM_CREATED:
      const itemFlags = itemFlagsReducer(new ItemFlags(), action);
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

export { itemsFlagReducer };
