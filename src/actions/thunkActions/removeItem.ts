import {IAction} from '../IAction';
import {deleteItem} from '../simpleActions/deleteItem';
import {actionTypes} from '../../constants/actionTypes';
import {Dispatch} from 'redux';
import {IAppState} from '../../reducers/IAppState';
import {ThunkAction} from 'redux-thunk';
import {deletingFailedForItem} from '../simpleActions/deletingFailedForItem';


export const preRemoveItem = (id: ItemId): IAction => ({
  type: actionTypes.PRE_REMOVE_ITEM,
  payload: {
    id,
  },
});

export const removeItem = (fetch: (id: ItemId) =>
  Promise<Response>) =>
  (id: ItemId) =>
    async (dispatch: Dispatch<ThunkAction<IAction, IAppState, void>> | Dispatch<IAction>): Promise<IAction> => {
      try {
        dispatch(preRemoveItem(id));
        await fetch(id);
        return dispatch(deleteItem(id));
      } catch {
        dispatch(deletingFailedForItem(id, 'Shark failed in eating item.'));
        return Promise.reject('Failed to remove');
      }
    };
