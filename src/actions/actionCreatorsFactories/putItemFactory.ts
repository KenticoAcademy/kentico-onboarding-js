import { AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { NO_CONNECTION } from '../../constants/connection';
import {
  PUT_ITEM_ERROR,
  PUT_ITEM_SUCCESS,
  TODO_LIST_ITEM_UPDATE
} from '../../constants/actionTypes';

interface IUpdateDependencies {
  readonly axiosPut: (item: IUpdateItem) => Promise<AxiosResponse>;
}

export const putSuccess = (id: Uuid): IAction => ({
  type: PUT_ITEM_SUCCESS,
  payload: {
    id
  }
});

export const putError = (id: Uuid, message: string): IAction => ({
  type: PUT_ITEM_ERROR,
  payload: {
    id,
    message
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
  ({axiosPut}: IUpdateDependencies) =>
    (item: IUpdateItem) =>
      async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
        dispatch(updateItem(item));

        try {
          const response = await axiosPut(item);

          return dispatch(putSuccess(response.data.id));
        } catch (error) {
          const message =
            error.response === undefined
              ? NO_CONNECTION
              : error.response.statusText;

          return dispatch(putError(item.id, message));
        }
      };
