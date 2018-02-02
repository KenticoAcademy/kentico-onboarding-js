import {
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../IAction';
import { ITEM_DELETE_ERROR } from '../../constants/actionTypes';
import { Uuid } from '../../utils/generateId';
import { IDependencies } from '../IDependencies';

interface IDeleteDependencies extends IDependencies {
  readonly deleteSuccess: (args: { id: Uuid }) => IAction;
  readonly itemDeleteFail: (id: Uuid) => IAction;
}

export const deleteItemFactory = ({deleteSuccess, itemDeleteFail, apiCallError, getAxios}: IDeleteDependencies) => (id: Uuid) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.delete(getAxios().url + '/' + id)
      .then(() => dispatch(deleteSuccess({id})))
      .catch((error: AxiosError) => {
        dispatch(itemDeleteFail(id));
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEM_DELETE_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEM_DELETE_ERROR, 'No internet connection'));
        }
      });
