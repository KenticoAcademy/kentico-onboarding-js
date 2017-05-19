import { Map } from 'immutable';

import { IAction } from '../../actions/IAction';
import { Item } from '../../models/Item';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  DELETE_ITEM,
  EDIT_ITEM,
  ITEM_SAVE_SUCCEED,
  ITEMS_FETCHING_SUCCEED
} from '../../actions/actionTypes';
import { itemReducer } from './itemReducer';
import { IItemServerModel } from '../../models/IItemServerModel';

export const itemsReducer = (state = Map<string, Item>(),
                             action: IAction): Map<string, Item> => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set(action.payload.id, itemReducer(state.get(action.payload.id), action));

    case POSITIVELY_CREATE_ITEM_LOCALLY:
      return state.set(action.payload.ueid, itemReducer(undefined, action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case ITEMS_FETCHING_SUCCEED:
      return Map<string, Item>(
        action.payload.items
          .map((item: IItemServerModel) => [item.id, new Item(item)])
      );

    case ITEM_SAVE_SUCCEED:
      return state
        .delete(action.payload.item.ueid)
        .set(action.payload.item.id, itemReducer(undefined, action));

    default:
      return state;
  }
};
