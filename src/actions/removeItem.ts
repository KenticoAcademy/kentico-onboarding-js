import { IAction } from './IAction';
import { ItemId } from '../models/ItemId';
import {
  clearErrorMessage,
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
      dispatch(clearErrorMessage(id));
      dispatch(toggleEditing(id, false));

      return fetch(id)
        .then(response => response.status >= 400 ? this.reject() : response)
        .then(() => dispatch(deleteItem(id)))
        .then(() => assertAlert('SUCCESS', 'Shark successfully ate item.'))
        .catch(() => {
          dispatch(toggleSynchronized(id, true));
          assertAlert('ERROR', 'Shark failed in eating item.');
          return dispatch(requestFailedForItem(id, 'Shark failed in eating item.'));
        });
    };
  };
