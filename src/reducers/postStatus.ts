import { ITEM_POST_ERROR, ITEM_POST_SUCCESS } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';

export const postStatus = (previousState: {} = {hasError: false}, action: IAction): {} => {
  switch (action.type) {
    case ITEM_POST_ERROR:
      return {
        hasError: true,
        errorMessage: action.payload.errorText
      };

    case ITEM_POST_SUCCESS:
      return {
        hasError: false
      };

    default:
      return previousState;
  }
};
