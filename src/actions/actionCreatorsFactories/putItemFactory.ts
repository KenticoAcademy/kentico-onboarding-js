import { AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import {
  ITEM_UPDATE_FAILED,
  ITEM_UPDATE_SUCCEEDED,
  TODO_LIST_ITEM_UPDATE
} from '../../constants/actionTypes';
import { IListItem } from '../../models/ListItem';

interface IUpdateDependencies {
  readonly axiosPut: (item: IUpdateItem) => Promise<AxiosResponse>;
  readonly getErrorMessage: (errorResponse: AxiosResponse) => string;
}

export const putSucceeded = (id: Uuid): IAction => ({
  type: ITEM_UPDATE_SUCCEEDED,
  payload: {
    id
  }
});

export const putFailed = (item: IListItem, message: string): IAction => ({
  type: ITEM_UPDATE_FAILED,
  payload: {
    item,
    message
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
  ({axiosPut, getErrorMessage}: IUpdateDependencies) =>
    (item: IUpdateItem) =>
      async (dispatch: Dispatch<IAppState>, getState: () => IAppState): Promise<IAction> => {
        const itemFromState = getState().todoList.items.get(item.id);
        dispatch(updateItem(item));

        try {
          const response = await axiosPut(item);

          return dispatch(putSucceeded(response.data.id));
        } catch (error) {
          const itemError = getState().error.get(item.id);
          const failedItem = itemError
            ? itemError.item
            : itemFromState;
          const message = getErrorMessage(error.response);

          return dispatch(putFailed(failedItem, message));
        }
      };
