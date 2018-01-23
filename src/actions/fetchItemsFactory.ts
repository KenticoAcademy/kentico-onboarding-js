import {
  AxiosResponse,
  AxiosError,
  AxiosStatic
} from 'axios';
import { ITEMS_FETCH_ERROR, ITEMS_FETCH_SUCCESS } from '../constants/actionTypes';
import { isUndefined } from 'util';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../utils/generateId';

interface FetchedItem {
  Text: string;
  Id: Uuid;
}

export const fetchItemsFactory = (dependencies: any, axios: AxiosStatic) => () =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) =>
    axios.get(url)
      .then((response: AxiosResponse) => response.data.map((item: FetchedItem) =>
        dispatch(dependencies.insertItem(item.Text, item.Id))))
      .then(() => dispatch(dependencies.setCallSuccess(ITEMS_FETCH_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(dependencies.setCallError(ITEMS_FETCH_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
