import { ThunkAction } from 'redux-thunk';
import { Actions } from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { addItemCreator } from './addItemCreator';
import { urlBase } from '../utils/urlBase';
import { deleteItem, fetchFailure } from '../itemsActions';
import { fetchFactory } from '../utils/fetchFactory';

export const postItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>, idGenerator: () => Guid) =>
  (text: string): ThunkAction<Promise<void>, void, void, Actions> =>
    (dispatch: Dispatch) => {
      const tempId: Guid = idGenerator();
      dispatch(addItemCreator(() => tempId)(text));

      return fetchFactory(fetch, urlBase, {
        method: 'POST',
        body: JSON.stringify({text}),
      })
        .then(
          response => response.json(),
        ).then(
          json => {
            dispatch(deleteItem(tempId));
            dispatch(addItemCreator(() => json.id)(json.text));
          },
        ).catch(
          error => {
            dispatch(deleteItem(tempId));
            dispatch(fetchFailure('There was an error while creating new item: ' + error.message));
          },
        );
    };
