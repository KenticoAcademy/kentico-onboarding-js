import { ItemId } from '../../models/ItemId';
import { IAction } from '../IAction';
import { addItem } from '../simpleActions/addItem';
import { assertAlert } from '../../utils/assertAlert';
import { synchronizeItemId } from '../simpleActions/synchronizeItemId';
import { toggleSynchronized } from '../simpleActions/toggleSynchronized';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';

export const uploadItem = (fetch: (text: string) => Promise<Response>, generateId: () => ItemId) =>
  (dispatch: Function) => {
    return (text: string): Promise<IAction> => {
      const id = generateId();
      dispatch(addItem(id, text));

      return fetch(text)
        .then(response => response.json())
        .then(itemWithOfficialId => {
          dispatch(synchronizeItemId(id, itemWithOfficialId.Id));
          return itemWithOfficialId.Id;
        })
        .then(officialId => dispatch(toggleSynchronized(officialId, true)))
        .then(() => assertAlert('SUCCESS', 'Uploaded item successfully'))
        .catch(() => {
          assertAlert('ERROR', 'Failed to upload item.');
          return dispatch(requestFailedForItem(id, errorMessageTypes.UPLOAD, 'Failed to upload. '));
        });
    };
  };
