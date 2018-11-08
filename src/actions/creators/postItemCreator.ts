import { ThunkAction } from 'redux-thunk';
import {
  Actions,
  AddItemAction,
  AddItemErrorAction,
  PostItemSuccessAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { postItemSuccess } from '../itemsActions';

export const postItemCreator = (
  fetch: Fetch,
  addItem: (text: string) => AddItemAction,
  addItemError: (itemId: Guid, error: string, action: ErrorAction) => AddItemErrorAction,
) =>
  (text: string): ThunkAction<Promise<PostItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    async (dispatch: Dispatch): Promise<PostItemSuccessAction | AddItemErrorAction> => {
      const tempId: Guid = dispatch(addItem(text))
        .payload
        .id;

      try {
        const response: Response = await fetch('', {
          method: 'POST',
          body: JSON.stringify({text}),
        });
        const json = await response.json();

        return dispatch(postItemSuccess(tempId, json.id));

      } catch (error) {
        return dispatch(addItemError(tempId, 'There was an error while creating new item: ' + error.message, 'POST'));
      }
    };
