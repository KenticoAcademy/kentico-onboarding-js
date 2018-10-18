import {actionTypes} from '../../constants/actionTypes';


export const deletingFailedForItem = (id: ItemId, errorMessage: string) => ({
  type: actionTypes.DELETING_FAILED_FOR_ITEM,
  payload: {
    id,
    errorMessage,
  },
});
