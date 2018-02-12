import {
  CLOSE_FETCH_ERROR,
  ITEMS_FETCH_ERROR, ITEMS_FETCH_SUCCESS
} from '../constants/actionTypes';
import { IAction } from '../actions/IAction';
import { FetchStatus } from '../models/FetchStatus';

export const fetchStatus = (previousState: FetchStatus = new FetchStatus(), action: IAction): FetchStatus => {
  switch (action.type) {
    case ITEMS_FETCH_ERROR: {
      const updatedStatus = {
        isFetching: false,
        hasError: true,
        errorMessage: action.payload.errorText
      };

      return previousState.with(updatedStatus);
    }

    case ITEMS_FETCH_SUCCESS:
    case CLOSE_FETCH_ERROR: {
      const updatedStatus = {
        isFetching: false,
        hasError: false
      };

      return previousState.with(updatedStatus);
    }

    default:
      return previousState;
  }
};
