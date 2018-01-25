import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { ITEM_POST_ERROR, ITEM_POST_SUCCESS } from '../constants/actionTypes';
import { isUndefined } from 'util';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from './IAction';
import { IDependencies } from './IInsertDependencies';

export const postItemFactory = ({insertItem, setCallSuccess, setCallError, url, axios}: IDependencies) => (text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> =>
    axios.post(url, {Text: text})
      .then((response: AxiosResponse) =>
        dispatch(insertItem(
          response.data.Text,
          response.data.Id)))
      .then(() => dispatch(setCallSuccess(ITEM_POST_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setCallError(ITEM_POST_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
