import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IListItem } from '../models/interfaces/IListItem';
import { INewItem } from '../models/interfaces/INewItem';

export const addNewItem = ({ id: itemId, text }: INewItem): IAction => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    itemId,
    text,
  },
});

export const deleteItem = (itemId: Guid): IAction => ({
  type: ActionTypes.ITEM_DELETED,
  payload: {
    itemId,
  },
});

export const saveItemChanges = (itemId: Guid, newText: string): IAction => ({
  type: ActionTypes.ITEM_CHANGES_SAVED,
  payload: {
    itemId,
    newText,
  },
});

export const changeItemOpenState = (itemId: Guid): IAction => ({
  type: ActionTypes.ITEM_OPEN_STATE_CHANGED,
  payload: {
    itemId,
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
