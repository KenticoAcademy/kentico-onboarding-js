import { APP_FETCH_ERROR, APP_FETCH_SUCCESS } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';

export const fetchStatus = (previousState: {} = {isFetching: true, hasError: false}, action: IAction): {} => {
  switch (action.type) {
    case APP_FETCH_ERROR:
      return {
        isFetching: false,
        hasError: true,
        errorMessage: action.payload.errorText
      };

    case APP_FETCH_SUCCESS:
      return {
        isFetching: false,
        hasError: false
      };

    default:
      return previousState;
  }
};
