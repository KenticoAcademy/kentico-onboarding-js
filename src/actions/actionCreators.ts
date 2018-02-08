import { IAction } from '../models/interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IListItem } from '../models/interfaces/IListItem';
import { MessageType } from '../models/enums/MessageType';
import { Message } from '../models/classes/Message';
import { INewItem } from '../models/interfaces/INewItem';

export const addNewItem = ({ id: itemId, text }: INewItem): IAction => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    itemId,
    text,
  },
});

export const openItemForEditing = (itemId: Guid): IAction => ({
  type: ActionTypes.ITEM_OPENED_FOR_EDITING,
  payload: {
    itemId,
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

export const cancelItemChanges = (itemId: Guid): IAction => ({
  type: ActionTypes.ITEM_CHANGES_CANCELED,
  payload: {
    itemId,
  },
});

export const requestItems = (uri: string): IAction => ({
  type: ActionTypes.FETCH_ITEMS,
  payload: {
    uri,
  }
});

export const receiveItems = (items: IListItem[]): IAction => ({
  type: ActionTypes.FETCH_ITEMS,
  payload: {
    items,
  }
});

export const fetchFailed = (error: Error): IAction => ({
  type: ActionTypes.FETCH_ITEMS,
  payload: {
    error,
  },
});

export const notifyError = (message: string): IAction => ({
  type: ActionTypes.ERROR_MESSAGE,
  payload: {
    message: new Message({
      content: message,
      type: MessageType.Error,
    }),
  },
});

export const notifySuccess = (message: string): IAction => ({
  type: ActionTypes.SUCCESS_MESSAGE,
  payload: {
    message: new Message({
      content: message,
      type: MessageType.Success,
    }),
  },
});

export const clearMessage = (): IAction => ({
  type: ActionTypes.CLEAR_MESSAGE,
  payload: {
    message: new Message({
      type: MessageType.Empty,
    }),
  }
});

export const registerAction = (action: () => void): IAction => ({
  type: ActionTypes.REGISTER_ACTION,
  payload: {
    action,
  },
});
