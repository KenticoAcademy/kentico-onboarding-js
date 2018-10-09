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
import { addItemErrorCreator } from './addItemErrorCreator';

export const putItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>, errorIdGenerator: () => Guid) =>
  (item: IItem): ThunkAction<Promise<PutItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    (dispatch: Dispatch) => {
      const errorId: Guid = errorIdGenerator();
      dispatch(saveItemText(item.id, item.text));

      return fetchFactory(fetch, urlBase + `/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({id: item.id, text: item.text}),
      })
        .then(
          () => dispatch(putItemSuccess(item.id, errorId)),
        )
        .catch(
          error =>
            dispatch(addItemErrorCreator(() => errorId)(item.id, 'There was an error while saving item: ' + error.message, 'PUT')),
        );
    };
