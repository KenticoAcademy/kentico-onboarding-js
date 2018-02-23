import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IListItem } from '../models/interfaces/IListItem';
import { IAddedItemConfirmed } from '../models/interfaces/IAddedItemConfirmed';
import { IItemSyncRequest } from '../models/interfaces/IItemSyncRequest';
import { SyncState } from '../models/enums/SyncState';

export const addNewItem = ({ id, text }: IListItem, itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    id,
    text,
    itemSyncInfo: {
      ...itemSyncRequest,
      state: SyncState.Pending,
    },
  },
});

export const confirmAddedItem = ({ id, newId }: IAddedItemConfirmed) => ({
  type: ActionTypes.ADDED_ITEM_CONFIRMED,
  payload: {
    id,
    newId,
  },
});

export const deleteItem = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_DELETED,
  payload: {
    id,
  },
});

export const deleteUnsavedItem = (id: Guid): IAction => ({
  type: ActionTypes.UNSAVED_ITEM_DELETED,
  payload: {
    id,
  }
});

export const saveItemChanges = (id: Guid, text: string, itemSyncRequest?: IItemSyncRequest): IAction => ({
  type: ActionTypes.ITEM_CHANGES_SAVED,
  payload: {
    id,
    text,
    itemSyncInfo: itemSyncRequest && {
      ...itemSyncRequest,
      state: SyncState.Pending,
    },
  },
});

export const closeItem = (id: Guid, itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.ITEM_CLOSED,
  payload: {
    id,
    itemSyncInfo: {
      ...itemSyncRequest,
      state: SyncState.Pending,
    },
  }
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

export const fetchFailed = (): IAction => ({
  type: ActionTypes.FETCH_ITEMS_FAIL,
  payload: undefined,
});

export const itemSyncFailed = (itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.ITEM_SYNC_FAILED,
  payload: {
    itemSyncInfo: {
      ...itemSyncRequest,
      state: SyncState.Unsynced,
    },
  }
});

export const itemSyncSucceeded = (itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.ITEM_SYNC_SUCCEEDED,
  payload: {
    itemSyncInfo: {
      ...itemSyncRequest,
      state: SyncState.Synced,
    },
  }
});
