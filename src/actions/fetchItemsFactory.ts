import {
  AxiosResponse,
  AxiosError,
} from 'axios';
import { ITEMS_FETCH_ERROR, ITEMS_FETCH_SUCCESS } from '../constants/actionTypes';
import { isUndefined } from 'util';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';
import { IDependencies } from './IInsertDependencies';

interface FetchedItem {
  Text: string;
  Id: Uuid;
}

export const fetchItemsFactory = ({ insertItem, setCallSuccess, setCallError, url, axios }: IDependencies) => () =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    axios.get(url)
      .then((response: AxiosResponse) => response.data.map((item: FetchedItem) =>
        dispatch(insertItem(item.Text, item.Id))))
      .then(() => dispatch(setCallSuccess(ITEMS_FETCH_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setCallError(ITEMS_FETCH_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
