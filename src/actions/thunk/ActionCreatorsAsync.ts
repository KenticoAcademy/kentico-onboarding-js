import { IAction } from '../../models/IAction';
import * as ActionTypes from '../../constants/actionTypes';
import { IListItem } from '../../models/IListItem';
import { Dispatch } from 'redux';
import { addNewItem } from '../actionCreators';

export const requestItems = (uri: string): IAction => ({
  type: ActionTypes.FETCH_ITEMS,
  payload: {
    uri,
  }
});

export const receiveItems = (items: IListItem[]): IAction => ({
  type: ActionTypes.FETCH_ITEMS,
  payload: {
    items,
  }
});

export const fetchItems = (uri: string) => (dispatch: Dispatch<IAction>) => {
  dispatch(requestItems(uri));

  return fetch(uri)
    .then((res: any) => res.json())
    .then((items: any) => dispatch(receiveItems(items)));
};

export const postItem = (uri: string, text: string) => (dispatch: Dispatch<IAction>) =>
  fetch(
    uri,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    }
  )
    .then((res: any) => res.json())
    .then((returnedItem: IListItem) => dispatch(addNewItem(returnedItem)));
