import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import {
  ITEM_ADD_REVERT,
  ITEM_DELETE_REVERT,
  ITEM_DELETE_AFTER_UPDATE_REVERT,
  ITEM_UPDATE_REVERT,
} from '../constants/actionTypes';

export const deleteUnsavedItem = (id: Guid): IAction => ({
  type: ActionTypes.UNSAVED_ITEM_DELETE,
  payload: {
    id,
  }
});

export const toggleItem = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_TOGGLE,
  payload: {
    id,
  }
});

export const desyncItem = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_SYNC_FAILED,
  payload: {
    id,
  }
});

// Revert
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

export const revertUpdate = (id: Guid): IAction => ({
  type: ITEM_UPDATE_REVERT,
  payload: {
    id,
  },
});

export const revertDeleteAfterFailedUpdate = (id: Guid): IAction => ({
  type: ITEM_DELETE_AFTER_UPDATE_REVERT,
  payload: {
    id,
  },
});
