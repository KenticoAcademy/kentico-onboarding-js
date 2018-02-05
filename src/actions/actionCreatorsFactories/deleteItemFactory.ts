import {
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import { IDependencies } from '../IDependencies';

interface IDeleteDependencies extends IDependencies {
  readonly deleteSuccess: (args: { id: Uuid }) => IAction;
  readonly itemDeleteFail: (args: { id: Uuid, message: string }) => IAction;
}

export const deleteItemFactory = ({deleteSuccess, itemDeleteFail, _apiCallError, getAxios}: IDeleteDependencies| any) => (id: Uuid) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.delete(getAxios().url + '/' + id)
      .then(() => dispatch(deleteSuccess({id})))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(itemDeleteFail(
            {
              id,
              message: 'Operation failed'
            }));
        } else {
          dispatch(itemDeleteFail(
            {
              id,
              message: 'No internet connection'
            }));
        }
      });
