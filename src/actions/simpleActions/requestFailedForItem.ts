import {actionTypes} from '../../constants/actionTypes';


export const requestFailedForItem = (id: ItemId, errorType: string, errorMessage: string) => ({
  type: actionTypes.REQUEST_FAILED_FOR_ITEM,
  payload: {
    id,
    errorType,
    errorMessage,
  },
});
