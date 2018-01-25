import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../models/IAppState';
import { IAction } from './IAction';
import { ITEM_PUT_ERROR, ITEM_PUT_SUCCESS } from '../constants/actionTypes';
import { isUndefined } from 'util';
import { Uuid } from '../utils/generateId';
import { IUpdateDependencies } from './IUpdateDependencies';

export const putItemFactory = ({updateItem, setCallSuccess, setCallError, url, axios}: IUpdateDependencies) => (id: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    axios.put(url + '/' + id, {Id: id, Text: text})
      .then((response: AxiosResponse) =>
        dispatch(updateItem(
          response.data.Id,
          response.data.Text
        )))
      .then(() => dispatch(setCallSuccess(ITEM_PUT_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setCallError(ITEM_PUT_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
