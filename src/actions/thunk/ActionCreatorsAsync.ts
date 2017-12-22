import { IAction } from '../../models/IAction';
import * as ActionTypes from '../../constants/actionTypes';
import { IListItem } from '../../models/IListItem';
import { Dispatch } from 'redux';

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
