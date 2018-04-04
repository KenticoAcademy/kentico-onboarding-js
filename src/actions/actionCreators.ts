import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IAddedItemConfirmed } from '../models/interfaces/IAddedItemConfirmed';
import { SyncState } from '../models/enums/SyncState';
import { SyncOperation } from '../models/enums/SyncOperation';
import { INewItem } from '../models/interfaces/INewItem';
import { IUpdatedItem } from '../models/interfaces/IUpdatedItem';
import { IFetchedItem } from '../models/interfaces/IFetchedItem';
import {
  ITEM_ADD_REVERT,
  ITEM_DELETE_REVERT,
  ITEM_DELETE_AFTER_UPDATE_REVERT,
  ITEM_UPDATE_REVERT,
} from '../constants/actionTypes';

export const addNewItemRequest = ({ id, text }: INewItem): IAction => ({
  type: ActionTypes.ITEM_ADD_START,
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
  type: ActionTypes.ITEM_ADD_SUCCESS,
  payload: {
    oldId,
    updatedItem,
  },
});

export const deleteItemRequest = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_DELETE_START,
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
  type: ActionTypes.ITEM_DELETE_SUCCESS,
  payload: {
    id,
  },
});

export const saveItemChangesRequest = (item: IUpdatedItem): IAction => ({
  type: ActionTypes.ITEM_UPDATE_START,
  payload: {
    item,
    itemSyncInfo: {
      id: item.id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Pending,
    },
  },
});

export const saveItemChangesConfirm = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_UPDATE_SUCCESS,
  payload: {
    id,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Synced,
    },
  }
});

export const deleteUnsavedItem = (id: Guid): IAction => ({
  type: ActionTypes.UNSAVED_ITEM_DELETE,
  payload: {
    id,
  }
});

export const changeItemOpenState = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_TOGGLE,
  payload: {
    id,
  }
});

export const requestItems = (): IAction => ({
  type: ActionTypes.ITEMS_FETCH_START,
  payload: undefined,
});

export const receiveItems = (items: IFetchedItem[]): IAction => ({
  type: ActionTypes.ITEMS_FETCH_SUCCESS,
  payload: {
    items,
  }
});

export const fetchFailed = (): IAction => ({
  type: ActionTypes.ITEMS_FETCH_FAILED,
  payload: undefined,
});

export const itemSyncFailed = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_SYNC_FAILED,
  payload: {
    id,
  }
});

export const revertDelete = (id: Guid): IAction => ({
  type: ITEM_DELETE_REVERT,
  payload: {
    id,
  },
});

export const revertAdd = (id: Guid): IAction => ({
  type: ITEM_ADD_REVERT,
  payload: {
    id,
  },
});

export const revertModify = (id: Guid): IAction => ({
  type: ITEM_UPDATE_REVERT,
  payload: {
    id,
  },
});

export const revertDeleteAfterFailedModify = (id: Guid): IAction => ({
  type: ITEM_DELETE_AFTER_UPDATE_REVERT,
  payload: {
    id,
  },
});
