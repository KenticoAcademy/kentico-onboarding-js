import { IAction } from '../../@types/IAction';
import { actionTypes } from '../../constants/actionTypes';

export const dataLoaded = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case actionTypes.ITEMS_LOADING:
      return false;

    case actionTypes.ITEMS_LOADING_DONE:
      return true;

    default:
      return state;
  }
};
