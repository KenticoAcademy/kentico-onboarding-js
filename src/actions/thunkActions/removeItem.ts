import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';
import { assertAlert } from '../../utils/assertAlert';
import { toggleSynchronized } from '../simpleActions/toggleSynchronized';
import { deleteItem } from '../simpleActions/deleteItem';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { actionTypes } from '../../constants/actionTypes';

export const preRemoveItem = (id: ItemId): IAction => ({
  type: actionTypes.PRE_REMOVE_ITEM,
  payload: {
    id,
  }
});

export const removeItem = (fetch: (id: ItemId) => Promise<Response>) =>
  (dispatch: Function) =>
    async (id: ItemId): Promise<IAction> => {
  try {
    dispatch(preRemoveItem(id));
    await fetch(id);
    assertAlert('SUCCESS', 'Shark successfully ate item.');
    return dispatch(deleteItem(id));
  } catch {
    dispatch(toggleSynchronized(id, true));
    assertAlert('ERROR', 'Shark failed in eating item.');
    return dispatch(requestFailedForItem(id, errorMessageTypes.DELETE, 'Shark failed in eating item.'));
  }};
