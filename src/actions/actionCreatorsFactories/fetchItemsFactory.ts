import {
  AxiosResponse,
  AxiosError,
} from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { NO_CONNECTION } from '../../constants/connection';
import { AxiosStatic } from 'axios';

interface FetchedItem {
  text: string;
  id: Uuid;
  createdAt: string;
  modifiedAt: string;
}

interface IPostDependencies {
  readonly insertItem: (args: { text: string, id: Uuid, isSynchronized: boolean }) => IAction;
  readonly fetchSuccess: () => IAction;
  readonly fetchError: (errorText: string) => IAction;
  readonly getAxios: {axios: AxiosStatic | any, url: string};
}

export const fetchItemsFactory =
  ({insertItem, fetchSuccess, fetchError, getAxios}: IPostDependencies) =>
    () => (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
      getAxios.axios.get(getAxios.url)
        .then((response: AxiosResponse) => response.data.map((item: FetchedItem) =>
          dispatch(insertItem({
            text: item.text,
            id: item.id,
            isSynchronized: true
          }))))
        .then(() => dispatch(fetchSuccess()))
        .catch((error: AxiosError) => {
          const errorResponse = error.response;
          if (errorResponse !== undefined) {
            dispatch(fetchError(errorResponse.status + ' ' + errorResponse.statusText));
          } else {
            dispatch(fetchError(NO_CONNECTION));
          }
        });
