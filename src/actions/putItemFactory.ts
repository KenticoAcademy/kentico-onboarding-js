import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../models/IAppState';
import { IAction } from './IAction';
import { ITEM_PUT_ERROR, ITEM_PUT_SUCCESS } from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IDependencies } from './IDependencies';

interface IUpdateDependencies extends IDependencies {
  readonly updateItem: (args: { id: string, text: Uuid }) => IAction;
}

export const putItemFactory = ({updateItem, apiCallSuccess, apiCallError, getAxios}: IUpdateDependencies) => (id: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.put(getAxios().url + '/' + id, {Id: id, Text: text})
      .then((response: AxiosResponse) =>
        dispatch(updateItem({
          id: response.data.Id,
          text: response.data.Text
        })))
      .then(() => dispatch(apiCallSuccess(ITEM_PUT_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEM_PUT_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEM_PUT_ERROR, 'No internet connection'));
        }
      });
