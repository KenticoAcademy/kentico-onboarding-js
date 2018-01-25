import {
  AxiosStatic,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../models/IAppState';
import { IAction } from './IAction';
import {
  ITEM_DELETE_ERROR, ITEM_DELETE_SUCCESS} from '../constants/actionTypes';
import { isUndefined } from 'util';
import { Uuid } from '../utils/generateId';

interface IDependencies {
  readonly deleteItem: (id: Uuid) => IAction;
  readonly setCallSuccess: (callType: string) => IAction;
  readonly setCallError: (errorType: string, errorText: string) => IAction;
  readonly url: string;
  readonly axios: AxiosStatic | any;
}

export const deleteItemFactory = ({deleteItem, setCallSuccess, setCallError, url, axios}: IDependencies) => (id: Uuid) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    axios.delete(url + '/' + id)
      .then(() => dispatch(deleteItem(id)))
      .then(() => dispatch(setCallSuccess(ITEM_DELETE_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setCallError(ITEM_DELETE_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
