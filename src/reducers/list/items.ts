import { OrderedMap } from 'immutable';

import { Item } from '../../models/Item';
import { item as itemReducer } from './item';
import { actionTypes } from '../../constants/actionTypes';
import { key } from '../../@types/key';
import { IAction } from '../../@types/IAction';

export const items = (state = OrderedMap<key, Item>(), action: IAction): OrderedMap<key, Item> => {
  switch (action.type) {
    case actionTypes.ITEM_ADD:
      return state.set(action.payload.itemKey, new Item({
        key: action.payload.itemKey,
        value: action.payload.newValue,
        temporaryValue: action.payload.newValue,
        isBeingEdited: false,
      }));

    case actionTypes.ITEM_DELETE:
      return state.delete(action.payload.itemKey);

    case actionTypes.ITEM_SAVE:
    case actionTypes.ITEM_EDITING_START:
    case actionTypes.ITEM_EDITING_STOP:
    case actionTypes.ITEM_VALUE_CHANGED:
      return state.mergeIn([action.payload.itemKey], itemReducer(state.get(action.payload.itemKey), action));

    case actionTypes.ITEM_SAVE_ALL:
    case actionTypes.ITEM_EDITING_STOP_ALL:
      return state.map(
        (item: Item, key: key) => {
          return action.payload.actions.has(key)
            ? itemReducer(item, action.payload.actions.get(key))
            : item;
        }).toOrderedMap();

    case actionTypes.ITEM_DELETE_ALL:
      return action.payload.selectedKeys.reduce((newState: OrderedMap<key, Item>, key: key) => newState.delete(key), state);

    default:
      return state;
  }
};
