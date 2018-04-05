import { IAction } from '../../@types/IAction';
import { actionTypes } from '../../constants/actionTypes';
import { ErrorComposition } from '../../models/ErrorComposition';
import { ERROR_GET_ITEMS } from '../../constants/constants';

export const error = (state = new ErrorComposition(), action: IAction): ErrorComposition => {
  switch (action.type) {
    case actionTypes.ITEMS_GET_FAILED:
      return state.with({
        globalError: ERROR_GET_ITEMS,
      });

    default:
      return state;
  }
};
