import { ITEMS_FETCH_ERROR, ITEMS_FETCH_SUCCESS } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';

export const fetchStatus = (previousState: {} = {isFetching: true, hasError: false}, action: IAction): {} => {
  switch (action.type) {
    case ITEMS_FETCH_ERROR:
      return {
        isFetching: false,
        hasError: true,
        errorMessage: action.payload.errorText
      };

    case ITEMS_FETCH_SUCCESS:
      return {
        isFetching: false,
        hasError: false
      };

    default:
      return previousState;
  }
};
