import { IItem } from '../../models/Item';
import { ThunkAction } from 'redux-thunk';
import {
  Actions,
  AddItemErrorAction,
  PutItemSuccessAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { putItemSuccess, saveItemText } from '../itemsActions';
import { urlBase } from '../utils/urlBase';
import { fetchFactory } from '../utils/fetchFactory';

export const putItemCreator = (
  fetch: Fetch,
  addItemError: (itemId: Guid, error: string, action: ErrorAction) => AddItemErrorAction,
) =>
  (item: IItem): ThunkAction<Promise<PutItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch): Promise<PutItemSuccessAction | AddItemErrorAction> => {
      dispatch(saveItemText(item.id, item.text));

      return fetchFactory(fetch, urlBase + `/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({id: item.id, text: item.text}),
      })
        .then(
          () => dispatch(putItemSuccess(item.id)),
        )
        .catch(
          error =>
            dispatch(addItemError(item.id, 'There was an error while saving item: ' + error.message, 'PUT')),
        );
    };
