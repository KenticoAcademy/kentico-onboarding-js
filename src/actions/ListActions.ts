import * as ActionType from './ActionTypes';
import { guid } from '../utils/guid';
import { addItemCreator } from './addItemCreator';
import { IAction } from './IAction';
import { getTime } from '../utils/getTime';
import { saveItemCreator } from './saveItemCreator';
import { ListSorting } from '../constants/ListSorting';

export const addItem = addItemCreator(guid, getTime);

export const saveItem = saveItemCreator(getTime);

export const toggleItem = (id: Uuid): IAction => ({
  type: ActionType.ToggleItem,
  payload: {
    id
  }
});

export const deleteItem = (id: Uuid): IAction => ({
  type: ActionType.DeleteItem,
  payload: {
    id
  }
});

export const setListSorting = (listView: ListSorting): IAction => ({
  type: ActionType.SetListSorting,
  payload: {
    sorting: listView
  }
});

