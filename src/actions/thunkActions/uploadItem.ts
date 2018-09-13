import { ItemId } from '../../models/ItemId';
import { IAction } from '../IAction';
import { addItem } from '../simpleActions/addItem';
import { synchronizeItemId } from '../simpleActions/synchronizeItemId';
import { setAsSynchronized } from '../simpleActions/setAsSynchronized';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { Dispatch } from 'redux';
import { IAppState } from '../../reducers/IAppState';
import { ThunkAction } from 'redux-thunk';
import { ItemFromServer } from '../../models/ItemFromServer';

export const uploadItem = (fetch: (text: string) => Promise<ItemFromServer>) =>
  (generateId: () => ItemId) =>
    (text: string) =>
      async (dispatch: Dispatch<ThunkAction<IAction, IAppState, void>>): Promise<IAction> => {
        const id = generateId();
        try {
          dispatch(addItem(id, text));
          const itemWithOfficialId = await fetch(text);
          dispatch(synchronizeItemId(id, itemWithOfficialId.Id));
          return dispatch(setAsSynchronized(itemWithOfficialId.Id));
        } catch {
          dispatch(requestFailedForItem(id, errorMessageTypes.UPLOAD, 'Failed to upload. '));
          return Promise.reject('Failed to upload');
        }
      };

