import { Map } from 'immutable';

import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  ITEM_POST_SUCCESS,
  ITEMS_FETCHING_SUCCESS
} from '../actions/actionTypes';
import { itemReducer } from './itemReducer';

export const itemsDataReducer = (state = Map<string, Item>(),
                                 action: IAction,): Map<string, Item> => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set(action.payload.id, itemReducer(state.get(action.payload.id), action));

    case CREATE_ITEM:
      return state.set(action.payload.ueid, itemReducer(undefined, action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case ITEMS_FETCHING_SUCCESS:
      return Map<string, Item>(
        action.payload.items
          .map((item: any) => [item.id, new Item(item)])
      );

    case ITEM_POST_SUCCESS:
      return state
        .delete(action.payload.item.ueid)
        .set(action.payload.item.id, itemReducer(undefined, action));

    default:
      return state;
  }
};
