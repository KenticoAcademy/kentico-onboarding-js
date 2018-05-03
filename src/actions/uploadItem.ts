import { ItemId } from '../models/ItemId';
import { IAction } from './IAction';
import {
  requestFailedForItem
} from './requestFailed';
import { toggleSynchronized } from './actionCreators';
import { addItem } from './addItem';
import { assertAlert } from '../utils/assertAlert';


export const uploadItem = (fetch: (id: ItemId, text: string) => Promise<Response>, generateId: () => ItemId) =>
  (dispatch: Function) => {
    return (text: string): Promise<IAction> => {
      const id = generateId();
      dispatch(addItem(id, text));

      return fetch(id, text)
        .then(response => response.status >= 400 ? this.reject() : response)
        .then(() => dispatch(toggleSynchronized(id, true)))
        .then(() => assertAlert('SUCCESS', 'Uploaded item successfully'))
        .catch(() => {
          assertAlert('ERROR', 'Failed to upload item');
          return dispatch(requestFailedForItem(id, 'Failed to upload.'));
        });
    };
  };
