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
  readonly insertItem: (args: {text: string, id: Uuid}) => IAction;
}

export const postItemFactory = ({insertItem, apiCallSuccess, apiCallError, url, axios}: IPostDependencies) => (text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    axios.post(url, {Text: text})
      .then((response: AxiosResponse) =>
        dispatch(insertItem({
          text: response.data.Text,
          id: response.data.Id
        })))
      .then(() => dispatch(apiCallSuccess(ITEM_POST_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (errorResponse !== undefined) {
          dispatch(apiCallError(ITEM_POST_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        } else {
          dispatch(apiCallError(ITEM_POST_ERROR, 'No internet connection'));
        }
      });
