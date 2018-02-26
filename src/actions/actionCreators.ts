import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IListItem } from '../models/interfaces/IListItem';
import { IAddedItemConfirmed } from '../models/interfaces/IAddedItemConfirmed';
import { IItemSyncRequest } from '../models/interfaces/IItemSyncRequest';
import { SyncState } from '../models/enums/SyncState';

export const addNewItemRequest = ({ id, text }: IListItem, itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.ADD_NEW_ITEM_REQUEST,
  payload: {
    id,
    text,
    itemSyncInfo: {
      ...itemSyncRequest,
      syncState: SyncState.Pending,
    },
  },
});

export const addNewItemConfirm = ({ id, newId }: IAddedItemConfirmed) => ({
  type: ActionTypes.ADD_NEW_ITEM_CONFIRM,
  payload: {
    id,
    newId,
  },
});

export const deleteItemRequest = (id: Guid, itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.DELETE_ITEM_REQUEST,
  payload: {
    id,
    itemSyncInfo: {
      ...itemSyncRequest,
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

export const saveItemChangesRequest = (id: Guid, text: string, itemSyncRequest?: IItemSyncRequest): IAction => ({
  type: ActionTypes.SAVE_ITEM_CHANGES_REQUEST,
  payload: {
    id,
    text,
    itemSyncInfo: itemSyncRequest && {
      ...itemSyncRequest,
      syncState: SyncState.Pending,
    },
  },
});

export const saveItemChangesConfirm = (itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.SAVE_ITEM_CHANGES_CONFIRM,
  payload: {
    itemSyncInfo: {
      ...itemSyncRequest,
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

export const requestItems = (uri: string): IAction => ({
  type: ActionTypes.REQUEST_ITEMS,
  payload: {
    uri,
  }
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

export const itemSyncFailed = (itemSyncRequest: IItemSyncRequest): IAction => ({
  type: ActionTypes.ITEM_SYNC_FAILED,
  payload: {
    itemSyncInfo: {
      ...itemSyncRequest,
      syncState: SyncState.Unsynced,
    },
  }
});
