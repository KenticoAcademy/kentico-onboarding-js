import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';

export const resetItem = (id: ItemId, errorTypes: string[]) => ({
  type: actionTypes.RESET_ITEM,
  payload: {
    id,
    errorTypes,
  }
});
