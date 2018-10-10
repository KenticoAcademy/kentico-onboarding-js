import { ThunkAction } from 'redux-thunk';
import {
  Actions,
  DeleteItemSuccessAction,
  AddItemErrorAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { urlBase } from '../utils/urlBase';
import { deleteItemSuccess, setItemSyncing } from '../itemsActions';
import { fetchFactory } from '../utils/fetchFactory';

export const deleteItemCreator = (
  fetch: Fetch,
  addItemError: (itemId: Guid, error: string, action: ErrorAction) => AddItemErrorAction,
) =>
  (id: Guid): ThunkAction<Promise<DeleteItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch): Promise<DeleteItemSuccessAction | AddItemErrorAction> => {
      dispatch(setItemSyncing(id, true));

      return fetchFactory(fetch, urlBase + `/${id}`, {method: 'DELETE'})
        .then(
          response => response.json(),
        ).then(
        json => dispatch(deleteItemSuccess(json.id)),
        ).catch(
          error =>
            dispatch(addItemError(id, 'There was an error while deleting item: ' + error.message, 'DELETE')),
        );
    };
