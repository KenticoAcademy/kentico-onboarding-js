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
import { addItemErrorCreator } from './addItemErrorCreator';

export const deleteItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>, errorIdGenerator: () => Guid) =>
  (id: Guid): ThunkAction<Promise<DeleteItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch) => {
      const errorId: Guid = errorIdGenerator();
      dispatch(setItemSyncing(id, true));

      return fetchFactory(fetch, urlBase + `/${id}`, {method: 'DELETE'})
        .then(
          response => response.json(),
        ).then(
        json => dispatch(deleteItemSuccess(json.id, errorId)),
        ).catch(
          error =>
            dispatch(addItemErrorCreator(() => errorId)(id, 'There was an error while deleting item: ' + error.message, 'DELETE')),
        );
    };
