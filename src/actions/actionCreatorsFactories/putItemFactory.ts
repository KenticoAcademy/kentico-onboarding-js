import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IDependencies } from '../IDependencies';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';

interface IUpdateDependencies extends IDependencies {
  readonly itemUpdateFail: (args: { id: Uuid, message: string }) => IAction;
  readonly putSuccess: (args: { id: Uuid }) => IAction;
}

export const putItemFactory = ({itemUpdateFail, putSuccess, _apiCallError, getAxios}: IUpdateDependencies | any) => (id: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.put(getAxios().url + '/' + id, {Id: id, Text: text})
      .then((response: AxiosResponse) =>
        dispatch(putSuccess({
          id: response.data.Id,
        })))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(itemUpdateFail(
            {
              id,
              message: errorResponse.statusText
            }));
        } else {
          dispatch(itemUpdateFail(
            {
              id,
              message: 'No internet connection'
            }));
        }
      });
