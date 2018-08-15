import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';

export const clearErrorMessage = (id: ItemId, errorType: string) => ({
  type: actionTypes.CLEAR_ERROR_MESSAGE,
  payload: {
    id,
    errorType,
  }
});
