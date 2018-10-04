import { ThunkAction } from 'redux-thunk';
import { Actions, DeleteItemAction, DisplayErrorAction } from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { urlBase } from '../utils/urlBase';
import { deleteItem, displayError } from '../itemsActions';
import { fetchFactory } from '../utils/fetchFactory';

export const deleteItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  (id: Guid): ThunkAction<Promise<DisplayErrorAction | DeleteItemAction>, void, void, Actions> =>
    (dispatch: Dispatch) =>
      fetchFactory(fetch, urlBase + `/${id}`, {method: 'DELETE'})
        .then(
          response => response.json(),
        ).then(
          json => dispatch(deleteItem(json.id)),
        ).catch(
          error => dispatch(displayError('There was an error while deleting item: ' + error.message)),
        );
