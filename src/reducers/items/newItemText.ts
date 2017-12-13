import {
  actionTypes,
} from '../../constants/actionTypes';
import { IAction } from '../../actions/IAction';

const DEFAULT_VALUE: string = '';

export const newItemText = (state = DEFAULT_VALUE, action: IAction): string => {
  switch (action.type) {
    case actionTypes.UPDATE_NEW_ITEM_TEXT:
      return action.payload.newItemText;
    case actionTypes.ADD_ITEM:
      return DEFAULT_VALUE;
    default:
      return state;
  }
};

