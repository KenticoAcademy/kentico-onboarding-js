import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { ITEM_POST_ERROR, ITEM_POST_SUCCESS } from '../constants/actionTypes';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from './IAction';
import { Uuid } from '../utils/generateId';
import { IDependencies } from './IDependencies';

interface IPostDependencies extends IDependencies {
  readonly postSuccess: (args: {newId: Uuid, id: Uuid, text: string, isSynchronized: boolean}) => IAction;
}

export const postItemFactory = ({postSuccess, apiCallSuccess, apiCallError, getAxios}: IPostDependencies) => (tempId: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    getAxios().axios.post(getAxios().url, {Text: text})
      .then((response: AxiosResponse) => dispatch(postSuccess({
          newId: response.data.Id,
          id: tempId,
          text: response.data.Text,
          isSynchronized: true
        }))
      )
      .then(() => dispatch(apiCallSuccess(ITEM_POST_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEM_POST_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEM_POST_ERROR, 'No internet connection'));
        }
      });
