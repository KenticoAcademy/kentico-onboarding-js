import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';

export const markAsBeingDeleted = (id: ItemId, isBeingDeleted: boolean) => ({
  type: actionTypes.MODIFY_DELETING,
  payload: {
    id,
    isBeingDeleted,
  }
});
