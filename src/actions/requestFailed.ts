import { actionTypes } from '../constants/actionTypes';
import { ItemId } from '../models/ItemId';

export const requestFailed = (errorMessage: string) => ({
  type: actionTypes.REQUEST_FAILED,
  payload: {
    errorMessage,
  }
});

export const requestFailedForItem = (id: ItemId, errorType: string,  errorMessage: string) => ({
  type: actionTypes.REQUEST_FAILED_FOR_ITEM,
  payload: {
    id,
    errorType,
    errorMessage,
  }
});
