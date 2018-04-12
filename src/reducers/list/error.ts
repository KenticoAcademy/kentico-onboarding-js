import { IAction } from '../../@types/IAction';
import { actionTypes } from '../../constants/actionTypes';
import {
  ERROR_ADD_ITEM,
  ERROR_GET_ITEMS,
  ERROR_SAVE_ITEM,
  ERROR_DELETE_ITEM,
  GUID_GLOBAL_ERROR,
} from '../../constants/constants';
import { Key } from '../../@types/Key';
import { OrderedMap } from 'immutable';

export const error = (state = OrderedMap<Key, string>(), action: IAction): OrderedMap<Key, string> => {
  switch (action.type) {
    case actionTypes.ITEMS_GET_FAILED:
      return state.set(GUID_GLOBAL_ERROR, ERROR_GET_ITEMS + ' (' + action.payload.error + ')');

    case actionTypes.ITEM_ADD_FAILED:
      return state.set(action.payload.itemKey, ERROR_ADD_ITEM + ' (' + action.payload.error + ')');

    case actionTypes.ITEM_SAVE_FAILED:
      return state.set(action.payload.itemKey, ERROR_SAVE_ITEM + ' (' + action.payload.error + ')');

    case actionTypes.ITEM_DELETE_FAILED:
      return state.set(action.payload.itemKey, ERROR_DELETE_ITEM + ' (' + action.payload.error + ')');

    case actionTypes.ITEM_DELETE_SUCCESS:
    case actionTypes.ITEM_SAVE_SUCCESS:
    case actionTypes.ERROR_DISMISS:
      return state.delete(action.payload.itemKey);

    default:
      return state;
  }
};
