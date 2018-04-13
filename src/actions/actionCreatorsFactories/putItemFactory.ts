import { AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { NO_CONNECTION } from '../../constants/connection';
import {
  ITEM_UPDATE_FAILED,
  ITEM_UPDATE_SUCCEEDED,
  TODO_LIST_ITEM_UPDATE
} from '../../constants/actionTypes';

interface IUpdateDependencies {
  readonly generateId: () => Uuid;
  readonly axiosPut: (item: IUpdateItem) => Promise<AxiosResponse>;
}

interface IError {
  errorId: Uuid;
  message: string;
  backupText: string;
}

export const putSucceeded = (id: Uuid): IAction => ({
  type: ITEM_UPDATE_SUCCEEDED,
  payload: {
    id
  }
});

export const putFailed = (id: Uuid, error: IError): IAction => ({
  type: ITEM_UPDATE_FAILED,
  payload: {
    id,
    ...error
  }
});

export interface IUpdateItem {
  id: Uuid;
  text: string;
  isSynchronized: boolean;
}

export const updateItem = (item: IUpdateItem): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: item,
});

export const putItemFactory =
  ({axiosPut, generateId}: IUpdateDependencies) =>
    (item: IUpdateItem) =>
      async (dispatch: Dispatch<IAppState>, getState: () => IAppState): Promise<IAction> => {
        const itemFromState = getState().todoList.items.get(item.id);
        const errorId = itemFromState.errorId;
        const updateError = getState().error.get(errorId);

        dispatch(updateItem(item));

        try {
          const response = await axiosPut(item);

          return dispatch(putSucceeded(response.data.id));
        } catch (error) {
          const message =
            error.response === undefined
              ? NO_CONNECTION
              : error.response.statusText;

          return dispatch(putFailed(
            item.id,
            updateError !== undefined
              ? {
                errorId: updateError.id,
                message,
                backupText: updateError.backupText,
              }
              : {
                errorId: generateId(),
                message,
                backupText: itemFromState.text,
              }
            )
          );
        }
      };
