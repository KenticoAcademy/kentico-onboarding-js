import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IListItem } from '../models/interfaces/IListItem';

export const addNewItem = ({ id, text }: IListItem): IAction => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_DELETED,
  payload: {
    id,
  },
});

export const saveItemChanges = (id: Guid, text: string): IAction => ({
  type: ActionTypes.ITEM_CHANGES_SAVED,
  payload: {
    id,
    text,
  },
});

export const changeItemOpenState = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_OPEN_STATE_CHANGED,
  payload: {
    id,
  }
});

export const requestItems = (uri: string): IAction => ({
  type: ActionTypes.FETCH_ITEMS_START,
  payload: {
    uri,
  }
});

export const receiveItems = (items: IListItem[]): IAction => ({
  type: ActionTypes.FETCH_ITEMS_SUCCESS,
  payload: {
    items,
  }
});
