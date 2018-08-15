import { ItemId } from '../../models/ItemId';
import { assertAlert } from '../../utils/assertAlert';
import { IAction } from '../IAction';
import { toggleSynchronized } from '../simpleActions/toggleSynchronized';
import { clearErrorMessage } from '../simpleActions/clearErrorMessage';
import { toggleEditing } from '../simpleActions/toggleEditing';
import { updateItemText } from '../simpleActions/updateItemText';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';

export const updateItem = (fetch: (id: ItemId, text: string) => Promise<Response>) =>
  (dispatch: Function) => {
    return (id: ItemId, text: string): Promise<IAction> => {
      dispatch(toggleSynchronized(id, false));
      dispatch(toggleEditing(id, false));
      dispatch(clearErrorMessage(id, 'UPDATE'));
      dispatch(updateItemText(id));

      return fetch(id, text)
        .then(response => response.status >= 400 ? this.reject() : response.json())
        .then(() => dispatch(toggleSynchronized(id, true)))
        .then(() => assertAlert('SUCCESS', 'Updated item text successfully'))
        .catch(() => {
          assertAlert('ERROR', 'Failed to update item text');
          return dispatch(requestFailedForItem(id, 'UPDATE', 'Failed to update item text. '));
        });
    };
  };
