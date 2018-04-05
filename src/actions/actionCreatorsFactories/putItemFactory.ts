import { AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { NO_CONNECTION } from '../../constants/connection';

interface IUpdateDependencies {
  readonly updateItem: (item: UpdateItem) => IAction;
  readonly putSuccess: (id: Uuid) => IAction;
  readonly putError: (id: Uuid, message: string) => IAction;
  readonly axiosPut: (item: UpdateItem) => Promise<AxiosResponse>;
}

export interface UpdateItem {
  id: Uuid;
  text: string;
}

export const putItemFactory =
  ({updateItem, putSuccess, putError, axiosPut}: IUpdateDependencies) =>
    (item: UpdateItem) =>
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
