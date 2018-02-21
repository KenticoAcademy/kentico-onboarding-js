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
  readonly putSuccess: (id: Uuid) => IAction;
  readonly putError: (args: { id: Uuid, message: string }) => IAction;
}

export const putItemFactory =
  ({putSuccess, putError, getAxios}: IUpdateDependencies) =>
    (id: Uuid, text: string) =>
      (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
        getAxios.axios.put(getAxios.url + '/' + id, {id, text})
          .then((response: AxiosResponse) =>
            dispatch(putSuccess(
              response.data.id,
            )))
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
