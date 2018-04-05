import { Map } from 'immutable';

import { actionTypes } from '../../constants/actionTypes';
import { Key } from '../../@types/Key';
import { IAction } from '../../@types/IAction';
import { stopItemEditing } from './itemActions';
import { IServerItem } from '../../models/IServerItem';
import { Item } from '../../models/Item';

export const saveItem = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_SAVE,
  payload: {
    itemKey,
  },
});

export const saveItems = (selectedKeys: Array<Key>): IAction => ({
  type: actionTypes.ITEM_SAVE_ALL,
  payload: {
    actions: Map(selectedKeys.map(key => [key, saveItem(key)])),
  },
});

export const deleteItem = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_DELETE,
  payload: {
    itemKey,
  },
});

export const deleteItems = (selectedKeys: Array<Key>): IAction => ({
  type: actionTypes.ITEM_DELETE_ALL,
  payload: {
    selectedKeys,
  },
});

export const cancelItemsEditing = (selectedKeys: Array<Key>): IAction => ({
  type: actionTypes.ITEM_EDITING_STOP_ALL,
  payload: {
    actions: Map(selectedKeys.map(key => [key, stopItemEditing(key)])),
  },
});

export const getItemsSuccess = (serverItems: Array<IServerItem>): IAction => ({
  type: actionTypes.ITEMS_GET_SUCCESS,
  payload: {
    items: serverItems.map((item: IServerItem) => new Item({
      key: item.id,
      value: item.text,
      temporaryValue: item.text,
    }))
  }
});


export const getItemsFailed = (error: string): IAction => ({
  type: actionTypes.ITEMS_GET_FAILED,
  payload: {
    error,
  }
});
