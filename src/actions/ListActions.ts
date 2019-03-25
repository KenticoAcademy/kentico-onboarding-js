import * as ActionType from './ActionTypes';
import { IAction } from './IAction';
import { ListSorting } from '../constants/ListSorting';
import { requestAddItemCreator } from './fetchActions/requestAddItem';
import { fetchItems, storeItem, editItem } from '../utils/fetchFactory';
import { requestAllItemsCreator } from './fetchActions/requestAllItems';
import { requestEditItemCreator } from './fetchActions/requestEditItem';

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

export const setItemErrorWasRendered = (id: Uuid): IAction => ({
  type: ActionType.ItemErrorWasRendered,
  payload: {
    id
  }
});

export const setNewItemErrorWasRendered = (): IAction => ({
  type: ActionType.NewItemErrorWasRendered,
  payload: {}
});


export const requestAddItem = requestAddItemCreator({ fetchAddItem: storeItem });

export const requestAllItems = requestAllItemsCreator({ fetchAllItems: fetchItems });

export const requestSaveItem = requestEditItemCreator({ editItem });
