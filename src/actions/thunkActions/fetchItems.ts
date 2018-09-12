import { IAction } from '../IAction';
import { actionTypes } from '../../constants/actionTypes';
import { Item } from '../../models/Item';
import { Dispatch } from 'redux';
import { requestFailed } from '../simpleActions/requestFailed';
import { IAppState } from '../../reducers/IAppState';
import { ThunkAction } from 'redux-thunk';

export const requestItems = (): IAction => ({
  type: actionTypes.REQUEST_ITEMS,
});

export const receiveItems = (items: Array<Item>) => ({
  type: actionTypes.RECEIVE_ITEMS,
  payload: {
    items: items,
  }
});

export const fetchItems = (fetch: () => Promise<Response>) =>
  () =>
    async (dispatch: Dispatch<ThunkAction<IAction, IAppState, void>>) : Promise<IAction>  => {
      try {
        dispatch(requestItems());
        const items = await (await fetch()).json();
        return dispatch(receiveItems(items));
      } catch {
        return dispatch(requestFailed('Failed to fetch.'));
      }
    };


