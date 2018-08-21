import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';
import { assertAlert } from '../../utils/assertAlert';
import { toggleSynchronized } from '../simpleActions/toggleSynchronized';
import { deleteItem } from '../simpleActions/deleteItem';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { preRemoveItem } from '../simpleActions/preRemoveItem';

export const removeItem = (fetch: (id: ItemId) => Promise<Response>) => {
  return (dispatch: Function) => {
    return (id: ItemId): Promise<IAction> => {
      dispatch(preRemoveItem(id));

      return fetch(id)
        .then(() => dispatch(deleteItem(id)))
        .then(() => assertAlert('SUCCESS', 'Shark successfully ate item.'))
        .catch(() => {
          dispatch(toggleSynchronized(id, true));
          assertAlert('ERROR', 'Shark failed in eating item.');
          return dispatch(requestFailedForItem(id, errorMessageTypes.DELETE, 'Shark failed in eating item.'));
        });
    };
  };
};
