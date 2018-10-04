import { IItem } from '../../models/Item';
import { ThunkAction } from 'redux-thunk';
import { Actions, PutItemSuccessAction } from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { displayItemError, putItemSuccess, saveItemText } from '../itemsActions';
import { urlBase } from '../utils/urlBase';
import { fetchFactory } from '../utils/fetchFactory';

export const putItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  (item: IItem): ThunkAction<Promise<void | PutItemSuccessAction>, void, void, Actions> =>
    (dispatch: Dispatch) => {
      dispatch(saveItemText(item.id, item.text));

      return fetchFactory(fetch, urlBase + `/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({id: item.id, text: item.text}),
      })
        .then(
          () => dispatch(putItemSuccess(item.id)),
        )
        .catch(
          error => {
            dispatch(displayItemError(item.id, 'There was an error while saving item: ' + error.message));
          },
        );
    };
