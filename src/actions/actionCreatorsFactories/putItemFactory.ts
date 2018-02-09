import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IDependencies } from '../IDependencies';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { NO_CONNECTION } from '../../constants/connection';

interface IUpdateDependencies extends IDependencies {
  readonly putSuccess: (args: { id: Uuid }) => IAction;
  readonly putError: (args: { id: Uuid, message: string }) => IAction;
}

export const putItemFactory = ({putSuccess, putError: putError, getAxios}: IUpdateDependencies | any) => (id: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.put(getAxios().url + '/' + id, {Id: id, Text: text})
      .then((response: AxiosResponse) =>
        dispatch(putSuccess({
          id: response.data.Id,
        })))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(putError(
            {
              id,
              message: errorResponse.statusText
            }));
        } else {
          dispatch(putError(
            {
              id,
              message: NO_CONNECTION
            }));
        }
      });
