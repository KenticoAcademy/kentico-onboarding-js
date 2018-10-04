import { Dispatch } from 'redux';
import { IItem, Item } from '../../models/Item';
import { displayError, loadingItemsSuccess } from '../itemsActions';
import { urlBase } from '../utils/urlBase';
import { ThunkAction } from 'redux-thunk';
import { Actions, DisplayErrorAction, LoadingItemsSuccessAction } from '../types/itemsActionTypes';
import { fetchFactory } from '../utils/fetchFactory';

export const getItemsCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  (): ThunkAction<Promise<LoadingItemsSuccessAction | DisplayErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch) =>
      fetchFactory(fetch, urlBase, {method: 'GET'})
        .then(
          response => response.json(),
        ).then(
          json => dispatch(loadingItemsSuccess(json.map( (item: IItem) => new Item(item)))),
        ).catch(
          error => dispatch(displayError('There was an error while loading items: ' + error.message)),
        );
