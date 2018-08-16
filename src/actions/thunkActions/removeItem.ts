import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';
import { assertAlert } from '../../utils/assertAlert';
import { markAsBeingDeleted } from '../simpleActions/markAsBeingDeleted';
import { toggleSynchronized } from '../simpleActions/toggleSynchronized';
import { clearErrorMessage } from '../simpleActions/clearErrorMessage';
import { toggleEditing } from '../simpleActions/toggleEditing';
import { deleteItem } from '../simpleActions/deleteItem';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';

export const removeItem = (fetch: (id: ItemId) => Promise<Response>) => {
  return (dispatch: Function) => {
    return (id: ItemId): Promise<IAction> => {
      dispatch(markAsBeingDeleted(id, true));
      dispatch(toggleSynchronized(id, false));
      dispatch(clearErrorMessage(id, errorMessageTypes.DELETE));
      dispatch(toggleEditing(id, false));

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
