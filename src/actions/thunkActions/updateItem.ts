import { ItemId } from '../../models/ItemId';
import { assertAlert } from '../../utils/assertAlert';
import { IAction } from '../IAction';
import { toggleSynchronized } from '../simpleActions/toggleSynchronized';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { preUpdateItem } from '../simpleActions/preUpdateItem';

export const updateItem = (fetch: (id: ItemId, text: string) => Promise<Response>) =>
  (dispatch: Function) => {
    return (id: ItemId, text: string): Promise<IAction> => {
      dispatch(preUpdateItem(id));

      return fetch(id, text)
        .then(() => dispatch(toggleSynchronized(id, true)))
        .then(() => assertAlert('SUCCESS', 'Updated item text successfully'))
        .catch(() => {
          assertAlert('ERROR', 'Failed to update item text');
          return dispatch(requestFailedForItem(id, errorMessageTypes.UPDATE, 'Failed to update item text. '));
        });
    };
  };
