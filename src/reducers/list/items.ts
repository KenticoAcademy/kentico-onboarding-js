import { OrderedMap } from 'immutable';

import { Item } from '../../models/Item';
import { item as itemReducer } from './item';
import { actionTypes } from '../../constants/actionTypes';
import { Key } from '../../@types/Key';
import { IAction } from '../../@types/IAction';

export const items = (state = OrderedMap<Key, Item>(), action: IAction): OrderedMap<Key, Item> => {
  switch (action.type) {
    case actionTypes.ITEM_ADD_SUCCESS:
      return state.set(action.payload.item.key, action.payload.item);

    case actionTypes.ITEM_DELETE_SUCCESS:
      return state.delete(action.payload.itemKey);

    case actionTypes.ITEM_DELETE_FAILED:
    case actionTypes.ITEM_DELETE_OPTIMISTIC:
    case actionTypes.ITEM_SAVE_FAILED:
    case actionTypes.ITEM_SAVE_OPTIMISTIC:
    case actionTypes.ITEM_SAVE_SUCCESS:
    case actionTypes.ITEM_EDITING_START:
    case actionTypes.ITEM_EDITING_STOP:
    case actionTypes.ITEM_VALUE_CHANGED:
      return state.mergeIn([action.payload.itemKey], itemReducer(state.get(action.payload.itemKey), action));

    case actionTypes.ITEM_EDITING_STOP_ALL:
      return state.map(
        (item: Item, key: Key) => {
          return action.payload.actions.has(key)
            ? itemReducer(item, action.payload.actions.get(key))
            : item;
        }).toOrderedMap();

    case actionTypes.ITEMS_GET_SUCCESS:
      return action.payload.items.reduce((newState: OrderedMap<Key, Item>, item: Item) => newState.set(item.key, item), OrderedMap<Key, Item>());

    default:
      return state;
  }
};
