import { Reducer } from 'redux';
import { actionTypes, } from '../../constants/actionTypes';
import { IAction } from '../../actions/IAction';

const DEFAULT_VALUE: string = '';

export const newItemText: Reducer<string> = (state = DEFAULT_VALUE, action: IAction) => {
  switch (action.type) {
    case actionTypes.UPDATE_NEW_ITEM:
      return action.payload.newItemText;
    case actionTypes.ADD_ITEM:
      return DEFAULT_VALUE;
    default:
      return state;
  }
};

