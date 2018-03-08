import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IListItem } from '../models/interfaces/IListItem';
import { IAddedItemConfirmed } from '../models/interfaces/IAddedItemConfirmed';
import { SyncState } from '../models/enums/SyncState';
import { SyncOperation } from '../models/enums/SyncOperation';
import { INewItem } from '../models/interfaces/INewItem';

export const addNewItemRequest = ({ id, text }: INewItem): IAction => ({
  type: ActionTypes.ADD_NEW_ITEM_REQUEST,
  payload: {
    id,
    text,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Add,
      syncState: SyncState.Pending,
    },
  },
});

export const addNewItemConfirm = ({ oldId, updatedItem }: IAddedItemConfirmed) => ({
  type: ActionTypes.ADD_NEW_ITEM_CONFIRM,
  payload: {
    oldId,
    updatedItem,
  },
});

export const deleteItemRequest = (id: Guid): IAction => ({
  type: ActionTypes.DELETE_ITEM_REQUEST,
  payload: {
    id,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Delete,
      syncState: SyncState.Pending,
    },
  }
});

export const deleteItemConfirm = (id: Guid): IAction => ({
  type: ActionTypes.DELETE_ITEM_CONFIRM,
  payload: {
    id,
  },
});

export const saveItemChangesRequest = (id: Guid, text: string): IAction => ({
  type: ActionTypes.SAVE_ITEM_CHANGES_REQUEST,
  payload: {
    id,
    text,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Pending,
    },
  },
});

export const saveItemChangesConfirm = (id: Guid): IAction => ({
  type: ActionTypes.SAVE_ITEM_CHANGES_CONFIRM,
  payload: {
    itemSyncInfo: {
      id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Synced,
    },
  }
});

export const deleteUnsavedItem = (id: Guid): IAction => ({
  type: ActionTypes.DELETE_UNSAVED_ITEM,
  payload: {
    id,
  }
});

export const changeItemOpenState = (id: Guid): IAction => ({
  type: ActionTypes.CHANGE_ITEM_OPEN_STATE,
  payload: {
    id,
  }
});

export const requestItems = (): IAction => ({
  type: ActionTypes.REQUEST_ITEMS,
  payload: undefined,
});

export const receiveItems = (items: IListItem[]): IAction => ({
  type: ActionTypes.RECEIVE_ITEMS,
  payload: {
    items,
  }
});

export const fetchFailed = (): IAction => ({
  type: ActionTypes.FETCH_FAILED,
  payload: undefined,
});

export const itemSyncFailed = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_SYNC_FAILED,
  payload: {
    id,
  }
});
