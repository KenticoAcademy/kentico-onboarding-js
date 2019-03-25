import * as ActionType from './ActionTypes';
import { IAction } from './IAction';
import { getTime } from '../utils/getTime';
import { saveItemCreator } from './saveItemCreator';
import { ListSorting } from '../constants/ListSorting';
import { requestAddItemCreator } from './fetchActions/requestAddItem';
import { storeItem, fetchItems } from '../utils/fetchFactory';
import { requestAllItemsCreator } from './fetchActions/requestAllItems';

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

export const setNewItemErrorWasRendered = (): IAction => ({
  type: ActionType.NewItemErrorWasRendered,
  payload: {}
});


export const requestAddItem = requestAddItemCreator({ fetchAddItem: storeItem });

export const requestAllItems = requestAllItemsCreator({ fetchAllItems: fetchItems });
