import { IAction } from '../../@types/IAction';
import { actionTypes } from '../../constants/actionTypes';

export const groupActionsEnabled = (state = true, action: IAction): boolean => {
  switch (action.type) {
    case actionTypes.ITEMS_GROUP_ACTIONS_TOGGLE:
      return !state;

    default:
      return state;
  }
};
