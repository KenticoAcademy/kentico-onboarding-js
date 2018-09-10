import { ItemId } from '../../models/ItemId';
import { IAction } from '../IAction';
import { addItem } from '../simpleActions/addItem';
import { assertAlert } from '../../utils/assertAlert';
import { synchronizeItemId } from '../simpleActions/synchronizeItemId';
import { toggleSynchronized } from '../simpleActions/toggleSynchronized';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { Dispatch } from 'redux';

export const uploadItem = (fetch: (text: string) => Promise<Response>, generateId: () => ItemId) =>
  (dispatch: Dispatch<IAction>) =>
    async (text: string): Promise<IAction> => {
      const id = generateId();
      try {
        dispatch(addItem(id, text));
        const itemWithOfficialId = await (await fetch(text)).json();
        assertAlert('SUCCESS', 'Uploaded item successfully');
        dispatch(synchronizeItemId(id, itemWithOfficialId.Id));
        return dispatch(toggleSynchronized(itemWithOfficialId.Id, true));
      } catch {
        assertAlert('ERROR', 'Failed to upload item.');
        return dispatch(requestFailedForItem(id, errorMessageTypes.UPLOAD, 'Failed to upload. '));
      }
    };

