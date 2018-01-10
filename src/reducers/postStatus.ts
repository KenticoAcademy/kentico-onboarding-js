import { APP_POST_ERROR, APP_POST_SUCCESS } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';

export const postStatus = (previousState: {} = {hasError: false}, action: IAction): {} => {
  switch (action.type) {
    case APP_POST_ERROR:
      return {
        hasError: true,
        errorMessage: action.payload.errorText
      };

    case APP_POST_SUCCESS:
      return {
        hasError: false
      };

    default:
      return previousState;
  }
};
