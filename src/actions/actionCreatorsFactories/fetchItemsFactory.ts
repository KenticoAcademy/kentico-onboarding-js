import {
  AxiosResponse,
  AxiosError,
} from 'axios';
import { ITEMS_FETCH_ERROR, ITEMS_FETCH_SUCCESS } from '../../constants/actionTypes';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IDependencies } from '../IDependencies';
import { NO_CONNECTION } from '../../constants/connection';

interface FetchedItem {
  Text: string;
  Id: Uuid;
  CreateTime: string;
  UpdateTime: string;
}

interface IPostDependencies extends IDependencies {
  readonly insertItem: (args: { text: string, id: Uuid, isSynchronized: boolean }) => IAction;
  readonly apiCallSuccess: (callType: string) => IAction;
}

export const fetchItemsFactory = ({insertItem, apiCallSuccess, apiCallError, getAxios}: IPostDependencies) => () =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.get(getAxios().url)
      .then((response: AxiosResponse) => response.data.map((item: FetchedItem) =>
        dispatch(insertItem({
          text: item.Text,
          id: item.Id,
          isSynchronized: true
        }))))
      .then(() => dispatch(apiCallSuccess(ITEMS_FETCH_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEMS_FETCH_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEMS_FETCH_ERROR, NO_CONNECTION));
        }
      });
