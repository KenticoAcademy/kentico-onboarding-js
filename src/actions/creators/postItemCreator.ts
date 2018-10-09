import { ThunkAction } from 'redux-thunk';
import { Actions, AddItemErrorAction, PostItemSuccessAction } from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { addItemCreator } from './addItemCreator';
import { urlBase } from '../utils/urlBase';
import { postItemSuccess } from '../itemsActions';
import { fetchFactory } from '../utils/fetchFactory';
import { addItemErrorCreator } from './addItemErrorCreator';

export const postItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>, idGenerator: () => Guid, errorIdGenerator: () => Guid) =>
  (text: string): ThunkAction<Promise<PostItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch) => {
      const errorId: Guid = errorIdGenerator();
      const tempId: Guid = dispatch(addItemCreator(idGenerator)(text))
        .payload
        .id;

      return fetchFactory(fetch, urlBase, {
        method: 'POST',
        body: JSON.stringify({text}),
      })
        .then(
          response => response.json(),
        ).then(
          json => dispatch(postItemSuccess(tempId, json.id, errorId)),
        ).catch(
          error =>
            dispatch(addItemErrorCreator(() => errorId)(tempId, 'There was an error while creating new item: ' + error.message, 'POST')),
        );
    };
