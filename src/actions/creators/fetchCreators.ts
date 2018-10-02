import { Dispatch } from 'redux';
import { IItem, Item } from '../../models/Item';
import { deleteItem, fetchFailure, fetchItemsSuccess, saveItemText } from '../itemsActions';
import { addItemCreator } from './addItemCreator';
import { urlBase } from '../utils/urlBase';
import { headerBase } from '../utils/headerBase';

export const getItemsCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  () =>
    (dispatch: Dispatch) =>
      fetch(urlBase, {
        ...headerBase,
        method: 'GET',
      })
        .then(
          response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          },
        ).then(
          json => dispatch(fetchItemsSuccess(json.map( (item: IItem) => new Item(item)))),
        ).catch(
          error => dispatch(fetchFailure(error.message)),
        );

export const postItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  (text: string) =>
    (dispatch: Dispatch) =>
      fetch(urlBase, {
        ...headerBase,
        method: 'POST',
        body: JSON.stringify({ text }),
      })
        .then(
          response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          },
        ).then(
          json => dispatch(addItemCreator(() => json.id)(json.text)),
        ).catch(
          error => dispatch(fetchFailure(error.message)),
        );

export const putItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  (item: IItem) =>
    (dispatch: Dispatch) =>
      fetch(urlBase + `/${item.id}`, {
        ...headerBase,
        method: 'PUT',
        body: JSON.stringify({ id: item.id, text: item.text }),
      })
        .then(
          response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            dispatch(saveItemText(item.id, item.text));
          },
        ).catch(
          error => dispatch(fetchFailure(error.message)),
        );

export const deleteItemCreator = (fetch: (input: string, init: RequestInit) => Promise<Response>) =>
  (id: Guid) =>
    (dispatch: Dispatch) =>
      fetch(urlBase + `/${id}`, {
        ...headerBase,
        method: 'DELETE',
      })
        .then(
          response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          },
        ).then(
          json => dispatch(deleteItem(json.id)),
        ).catch(
          error => dispatch(fetchFailure(error.message)),
        );
