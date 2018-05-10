import { ItemId } from '../models/ItemId';
import { IAction } from './IAction';
import {
  requestFailedForItem
} from './requestFailed';
import {
  synchronizeItemId,
  toggleSynchronized
} from './actionCreators';
import { addItem } from './addItem';
import { assertAlert } from '../utils/assertAlert';

export const uploadItem = (fetch: (id: ItemId, text: string) => Promise<Response>, generateId: () => ItemId) =>
  (dispatch: Function) => {
    return (text: string): Promise<IAction> => {
      const id = generateId();
      dispatch(addItem(id, text));

      return fetch(id, text)
        .then(response => response.status >= 400 ? this.reject() : response.json())
        .then(officialId => {
          dispatch(synchronizeItemId(id, officialId));
          return officialId;
        })
        .then(officialId => dispatch(toggleSynchronized(officialId, true)))
        .then(() => assertAlert('SUCCESS', 'Uploaded item successfully'))
        .catch(() => {
          assertAlert('ERROR', 'Failed to upload item');
          return dispatch(requestFailedForItem(id, 'Failed to upload.'));
        });
    };
  };
