import { IAction } from '../IAction';
import { requestFailedForItem } from '../simpleActions/requestFailedForItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { actionTypes } from '../../constants/actionTypes';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../../reducers/IAppState';
import { updateSucceeded } from '../simpleActions/updateSucceeded';

export const preUpdateItem = (id: ItemId): IAction => ({
  type: actionTypes.PRE_UPDATE_ITEM,
  payload: {
    id,
  }
});

export const updateItem = (fetch: (id: ItemId, text: string) => Promise<Response>) =>
  (id: ItemId, text: string) =>
    async (dispatch: Dispatch<ThunkAction<IAction, IAppState, void>>): Promise<IAction> => {
      try {
        dispatch(preUpdateItem(id));
        await fetch(id, text);
        return dispatch(updateSucceeded(id));
      } catch {
        dispatch(requestFailedForItem(id, errorMessageTypes.UPDATE, 'Failed to update item text. '));
        return Promise.reject('Failed to update');
      }
    };
