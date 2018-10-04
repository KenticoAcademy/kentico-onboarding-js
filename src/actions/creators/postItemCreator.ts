import { ThunkAction } from 'redux-thunk';
import { Actions, DisplayItemErrorAction, PostItemSuccessAction } from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { addItemCreator } from './addItemCreator';
import { urlBase } from '../utils/urlBase';
import { displayItemError, postItemSuccess } from '../itemsActions';
import { fetchFactory } from '../utils/fetchFactory';

export const postItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>, idGenerator: () => Guid) =>
  (text: string): ThunkAction<Promise<PostItemSuccessAction | DisplayItemErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch) => {
      const tempId: Guid = dispatch(addItemCreator(idGenerator)(text))
        .payload.id;

      return fetchFactory(fetch, urlBase, {
        method: 'POST',
        body: JSON.stringify({text}),
      })
        .then(
          response => response.json(),
        ).then(
          json => dispatch(postItemSuccess(tempId, json.id, json.text)),
        ).catch(
          error =>
            dispatch(displayItemError(tempId, 'There was an error while creating new item: ' + error.message)),
        );
    };
