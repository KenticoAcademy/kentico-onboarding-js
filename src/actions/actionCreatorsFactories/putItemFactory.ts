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

export const putSucceeded = (id: Uuid): IAction => ({
  type: ITEM_UPDATE_SUCCEEDED,
  payload: {
    id
  }
});

export const putFailed = (id: Uuid, error: { errorId: Uuid, message: string }): IAction => ({
  type: ITEM_UPDATE_FAILED,
  payload: {
    id,
    ...error
  }
});

export interface IUpdateItem {
  id: Uuid;
  text: string;
}

export const updateItem = (item: IUpdateItem): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: item,
});

export const putItemFactory =
  ({axiosPut, generateId}: IUpdateDependencies) =>
    (item: IUpdateItem) =>
      async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
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
            {
              errorId: generateId(),
              message
            })
          );
        }
      };
