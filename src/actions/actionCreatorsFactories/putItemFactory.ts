import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IDependencies } from '../IDependencies';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { ITEM_PUT_ERROR } from '../../constants/actionTypes';

interface IUpdateDependencies extends IDependencies {
  readonly putSuccess: (args: { id: Uuid }) => IAction;
}

export const putItemFactory = ({putSuccess, apiCallError, getAxios}: IUpdateDependencies) => (id: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.put(getAxios().url + '/' + id, {Id: id, Text: text})
      .then((response: AxiosResponse) =>
        dispatch(putSuccess({
          id: response.data.Id,
        })))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEM_PUT_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEM_PUT_ERROR, 'No internet connection'));
        }
      });
