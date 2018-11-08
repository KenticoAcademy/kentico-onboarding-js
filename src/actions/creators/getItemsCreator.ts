import { Dispatch } from 'redux';
import { IItem, Item } from '../../models/Item';
import { displayError, loadingItemsSuccess } from '../itemsActions';
import { ThunkAction } from 'redux-thunk';
import {
  Actions,
  DisplayErrorAction,
  LoadingItemsSuccessAction,
} from '../types/itemsActionTypes';

export const getItemsCreator = (fetch: Fetch) =>
  (): ThunkAction<Promise<LoadingItemsSuccessAction | DisplayErrorAction>, void, void, Actions> =>
    async (dispatch: Dispatch): Promise<LoadingItemsSuccessAction | DisplayErrorAction> => {
      try {
        const response: Response = await fetch('', {method: 'GET'});
        const json = await response.json();

        return dispatch(loadingItemsSuccess(json.map((item: IItem) => new Item(item))));

      } catch (error) {
        return dispatch(displayError('There was an error while loading items: ' + error.message));
      }
    };
