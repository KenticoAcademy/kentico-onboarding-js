import { IAction } from '../../@types/IAction';
import { actionTypes } from '../../constants/actionTypes';

export const dataLoaded = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case actionTypes.ITEMS_LOADING_TOGGLE:
      return !state;

    default:
      return state;
  }
};
