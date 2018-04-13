import {
  ITEMS_FETCH_ERROR_CLOSE,
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_STARTED,
  ITEMS_FETCH_SUCCEEDED
} from '../../constants/actionTypes';
import { IAction } from '../../actions/IAction';
import { FetchStatus } from '../../models/FetchStatus';

export const fetchStatus = (previousState: FetchStatus = new FetchStatus(), action: IAction): FetchStatus => {
  switch (action.type) {
    case ITEMS_FETCH_STARTED: {
      const updatedStatus = {
        isFetching: true
      };

      return previousState.with(updatedStatus);
    }
    case ITEMS_FETCH_FAILED: {
      const updatedStatus = {
        isFetching: false,
        hasError: true,
        errorMessage: action.payload.errorText
      };

      return previousState.with(updatedStatus);
    }

    case ITEMS_FETCH_SUCCEEDED:
    case ITEMS_FETCH_ERROR_CLOSE: {
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
