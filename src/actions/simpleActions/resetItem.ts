import { actionTypes } from '../../constants/actionTypes';

export const resetItem = (id: ItemId, errorTypes: string[]) => ({
  type: actionTypes.RESET_ITEM,
  payload: {
    id,
    errorTypes,
  }
});
