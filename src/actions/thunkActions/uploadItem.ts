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
import { Item } from '../../models/Item';

export const uploadItem = (fetch: (text: string) => Promise<Item>) =>
  (generateId: () => ItemId) =>
    (text: string) =>
      async (dispatch: Dispatch<ThunkAction<IAction, IAppState, void>>): Promise<IAction> => {
        const id = generateId();
        try {
          dispatch(addItem(id, text));
          const itemWithOfficialId = await fetch(text);
          dispatch(synchronizeItemId(id, itemWithOfficialId.id));
          return dispatch(setAsSynchronized(itemWithOfficialId.id));
        } catch {
          return dispatch(requestFailedForItem(id, errorMessageTypes.UPLOAD, 'Failed to upload. '));
        }
      };

