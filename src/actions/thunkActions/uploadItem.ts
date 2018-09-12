import { ItemId } from '../../models/ItemId';
import { IAction } from '../IAction';
import { addItem } from '../simpleActions/addItem';
import { assertAlert } from '../../utils/assertAlert';
import { synchronizeItemId } from '../simpleActions/synchronizeItemId';
import { setAsSynchronized } from '../simpleActions/setAsSynchronized';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { Dispatch } from 'redux';
import { IAppState } from '../../reducers/IAppState';
import { ThunkAction } from 'redux-thunk';

export const uploadItem = (fetch: (text: string) => Promise<Response>, generateId: () => ItemId) =>
  (text: string) =>
    async (dispatch: Dispatch<ThunkAction<IAction, IAppState, void>>): Promise<IAction> => {
      const id = generateId();
      try {
        dispatch(addItem(id, text));
        const itemWithOfficialId = await (await fetch(text)).json();
        assertAlert('SUCCESS', 'Uploaded item successfully');
        dispatch(synchronizeItemId(id, itemWithOfficialId.Id));
        return dispatch(setAsSynchronized(itemWithOfficialId.Id));
      } catch {
        assertAlert('ERROR', 'Failed to upload item.');
        return dispatch(requestFailedForItem(id, errorMessageTypes.UPLOAD, 'Failed to upload. '));
      }
    };

