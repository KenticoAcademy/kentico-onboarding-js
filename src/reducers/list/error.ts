import { IAction } from '../../@types/IAction';
import { actionTypes } from '../../constants/actionTypes';
import { ErrorComposition } from '../../models/ErrorComposition';
import {
  ERROR_ADD_ITEM,
  ERROR_GET_ITEMS,
} from '../../constants/constants';

export const error = (state = new ErrorComposition(), action: IAction): ErrorComposition => {
  switch (action.type) {
    case actionTypes.ITEMS_GET_FAILED:
      return state.with({
        globalError: ERROR_GET_ITEMS,
      });

    case actionTypes.ITEM_ADD_FAILED:
      return state.with({
        globalError: action.payload.error ? ERROR_ADD_ITEM + ' (' + action.payload.error + ')' : ERROR_ADD_ITEM,
      });

    default:
      return state;
  }
};
