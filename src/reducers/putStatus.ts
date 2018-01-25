import { ITEM_PUT_ERROR, ITEM_PUT_SUCCESS } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';
import { PutStatus } from '../models/PutStatus';

export const putStatus = (previousState: PutStatus = new PutStatus(), action: IAction): PutStatus => {
  switch (action.type) {
    case ITEM_PUT_ERROR: {
      const updatedStatus = {
        hasError: true,
        errorMessage: action.payload.errorText
      };

      return previousState.with(updatedStatus);
    }
    case ITEM_PUT_SUCCESS: {
      const updatedStatus = {
        hasError: false
      };

      return previousState.with(updatedStatus);
    }

    default:
      return previousState;
  }
};
