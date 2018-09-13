import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';
import { setAsSynchronized } from '../simpleActions/setAsSynchronized';
import { deleteItem } from '../simpleActions/deleteItem';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { actionTypes } from '../../constants/actionTypes';
import { Dispatch } from 'redux';
import { IAppState } from '../../reducers/IAppState';
import { ThunkAction } from 'redux-thunk';

export const preRemoveItem = (id: ItemId): IAction => ({
  type: actionTypes.PRE_REMOVE_ITEM,
  payload: {
    id,
  }
});

export const removeItem = (fetch: (id: ItemId) => Promise<Response>) =>
  (id: ItemId) =>
    async (dispatch: Dispatch<ThunkAction<IAction, IAppState, void>>|Dispatch<IAction>): Promise<IAction> => {
      try {
        dispatch(preRemoveItem(id));
        await fetch(id);
        return dispatch(deleteItem(id));
      } catch {
        dispatch(setAsSynchronized(id));
        dispatch(requestFailedForItem(id, errorMessageTypes.DELETE, 'Shark failed in eating item.'));
        return Promise.reject('Failed to remove');
      }
    };
