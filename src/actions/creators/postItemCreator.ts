import { ThunkAction } from 'redux-thunk';
import {
  Actions,
  AddItemAction,
  AddItemErrorAction,
  PostItemSuccessAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { urlBase } from '../utils/urlBase';
import { postItemSuccess } from '../itemsActions';
import { fetchFactory } from '../utils/fetchFactory';

export const postItemCreator = (
  fetch: Fetch,
  addItem: (text: string) => AddItemAction,
  addItemError: (itemId: Guid, error: string, action: ErrorAction) => AddItemErrorAction,
) =>
  (text: string): ThunkAction<Promise<PostItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch): Promise<PostItemSuccessAction | AddItemErrorAction> => {
      const tempId: Guid = dispatch(addItem(text))
        .payload
        .id;

      return fetchFactory(fetch, urlBase, {
        method: 'POST',
        body: JSON.stringify({text}),
      })
        .then(
          response => response.json(),
        ).then(
          json => dispatch(postItemSuccess(tempId, json.id)),
        ).catch(
          error =>
            dispatch(addItemError(tempId, 'There was an error while creating new item: ' + error.message, 'POST')),
        );
    };
