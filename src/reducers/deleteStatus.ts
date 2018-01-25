import { IAction } from '../actions/IAction';
import { DeleteStatus } from '../models/DeleteStatus';
import { ITEM_DELETE_ERROR, ITEM_DELETE_SUCCESS } from '../constants/actionTypes';

export const deleteStatus = (previousState: DeleteStatus = new DeleteStatus(), action: IAction): DeleteStatus => {
  switch (action.type) {
    case ITEM_DELETE_ERROR: {
      const updatedStatus = {
        hasError: true,
        errorMessage: action.payload.errorText
      };

      return previousState.with(updatedStatus);
    }
    case ITEM_DELETE_SUCCESS: {
      const updatedStatus = {
        hasError: false
      };

      return previousState.with(updatedStatus);
    }

    default:
      return previousState;
  }
};
