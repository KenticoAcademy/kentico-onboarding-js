import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { ITEM_POST_ERROR } from '../../constants/actionTypes';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import { IDependencies } from '../IDependencies';
import { NO_CONNECTION } from '../../constants/connection';

interface IPostDependencies extends IDependencies {
  readonly deleteSuccess: (id: Uuid) => IAction;
  readonly postSuccess: (args: {newId: Uuid, id: Uuid, text: string, isSynchronized: boolean}) => IAction;
  readonly apiCallError: (errorType: string, errorText: string) => IAction;
}

export const postItemFactory = ({deleteSuccess, postSuccess, apiCallError, getAxios}: IPostDependencies) => (tempId: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.post(getAxios().url, {Text: text})
      .then((response: AxiosResponse) => dispatch(postSuccess({
          newId: response.data.Id,
          id: tempId,
          text: response.data.Text,
          isSynchronized: true
        })))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        dispatch(deleteSuccess(tempId));
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEM_POST_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEM_POST_ERROR, NO_CONNECTION));
        }
      });
