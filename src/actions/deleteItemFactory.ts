import {
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../models/IAppState';
import { IAction } from './IAction';
import {
  ITEM_DELETE_ERROR, ITEM_DELETE_SUCCESS
} from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IDependencies } from './IDependencies';

interface IDeleteDependencies extends IDependencies {
  readonly deleteItem: (id: Uuid) => IAction;
}

export const deleteItemFactory = ({deleteItem, apiCallSuccess, apiCallError, getAxios}: IDeleteDependencies) => (id: Uuid) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.delete(getAxios().url + '/' + id)
      .then(() => dispatch(deleteItem(id)))
      .then(() => dispatch(apiCallSuccess(ITEM_DELETE_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEM_DELETE_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEM_DELETE_ERROR, 'No internet connection'));
        }
      });
