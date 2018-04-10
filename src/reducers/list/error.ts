import { IAction } from '../../@types/IAction';
import { actionTypes } from '../../constants/actionTypes';
import { ErrorComposition } from '../../models/ErrorComposition';
import {
  ERROR_ADD_ITEM,
  ERROR_GET_ITEMS,
  ERROR_SAVE_ITEM,
  ERROR_DELETE_ITEM,
} from '../../constants/constants';
import { OrderedMap } from 'immutable';
import { Key } from '../../@types/Key';

export const error = (state = new ErrorComposition(), action: IAction): ErrorComposition => {
  switch (action.type) {
    case actionTypes.ITEMS_GET_FAILED:
      return state.with({
        globalError: ERROR_GET_ITEMS,
      });

    case actionTypes.ITEM_ADD_FAILED:
      return state.with({
        itemsError: state.itemsError.set(action.payload.itemKey, ERROR_ADD_ITEM + ' (' + action.payload.error + ')'),
      });

    case actionTypes.ITEM_SAVE_FAILED:
      return state.with({
        itemsError: state.itemsError.set(action.payload.itemKey, ERROR_SAVE_ITEM + ' (' + action.payload.error + ')'),
      });

    case actionTypes.ITEM_DELETE_FAILED:
      return state.with({
        itemsError: state.itemsError.set(action.payload.itemKey, ERROR_DELETE_ITEM + ' (' + action.payload.error + ')'),
      });

    case actionTypes.ITEM_DELETE_SUCCESS:
    case actionTypes.ITEM_SAVE_SUCCESS:
    case actionTypes.ITEM_EDITING_STOP:
      return state.with({
        itemsError: state.itemsError.delete(action.payload.itemKey),
      });

    case actionTypes.ITEM_EDITING_STOP_ALL:
      return state.with({
        itemsError: action.payload.selectedKeys
          .reduce((newState: OrderedMap<Key, string>, key: Key) => newState.delete(key), state.itemsError),
      });

    default:
      return state;
  }
};
