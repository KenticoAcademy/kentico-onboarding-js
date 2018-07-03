import { IAction } from './IAction';
import { ItemId } from '../models/ItemId';
import {
  deleteItem,
  markAsBeingDeleted,
  toggleEditing,
  toggleSynchronized,
} from './actionCreators';
import { assertAlert } from '../utils/assertAlert';
import { requestFailedForItem } from './requestFailed';

export const removeItem = (fetch: (id: ItemId) => Promise<Response>) =>
  (dispatch: Function) => {
    return (id: ItemId): Promise<IAction> => {
      dispatch(markAsBeingDeleted(id, true));
      dispatch(toggleSynchronized(id, false));
      dispatch(toggleEditing(id));

      return fetch(id)
        .then(response => response.status >= 400 ? this.reject() : response)
        .then(() => dispatch(deleteItem(id)))
        .then(() => assertAlert('SUCCESS', 'Deleted item text successfully.'))
        .catch(() => {
          dispatch(toggleSynchronized(id, true));
          assertAlert('ERROR', 'Failed to delete item.');
          return dispatch(requestFailedForItem(id, 'Failed to delete item.'));
        });
    };
  };
