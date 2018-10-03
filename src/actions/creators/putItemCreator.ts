import { IItem } from '../../models/Item';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../../store/state/IAppState';
import { Actions } from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { fetchFailure, saveItemText } from '../itemsActions';
import { urlBase } from '../utils/urlBase';
import { fetchFactory } from '../utils/fetchFactory';

export const putItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  (item: IItem): ThunkAction<Promise<void | Response>, IAppState, void, Actions> =>
    (dispatch: Dispatch, getState: () => IAppState) => {
      const oldText: string = getState().list.items.get(item.id).text;
      dispatch(saveItemText(item.id, item.text));

      return fetchFactory(fetch, urlBase + `/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({id: item.id, text: item.text}),
      })
        .catch(
          error => {
            dispatch(saveItemText(item.id, oldText));
            dispatch(fetchFailure('There was an error while saving item: ' + error.message));
          },
        );
    };
