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

export const uploadItem = (fetch: (text: string) => Promise<Response>, generateId: () => ItemId) =>
  (dispatch: Function) => {
    return (text: string): Promise<IAction> => {
      const id = generateId();
      dispatch(addItem(id, text));

      return fetch(text)
        .then(response => response.status >= 400 ? this.reject() : response.json())
        .then(itemWithOfficialId => {
          dispatch(synchronizeItemId(id, itemWithOfficialId.Id));
          return itemWithOfficialId.Id;
        })
        .then(officialId => dispatch(toggleSynchronized(officialId, true)))
        .then(() => assertAlert('SUCCESS', 'Uploaded item successfully'))
        .catch(() => {
          assertAlert('ERROR', 'Failed to upload item.');
          return dispatch(requestFailedForItem(id, 'UPLOAD', 'Failed to upload. '));
        });
    };
  };
