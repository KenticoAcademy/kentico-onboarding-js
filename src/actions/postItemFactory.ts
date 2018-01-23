import {
  AxiosResponse,
  AxiosError,
  AxiosStatic
} from 'axios';
import { ITEM_POST_ERROR, ITEM_POST_SUCCESS } from '../constants/actionTypes';
import { isUndefined } from 'util';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';

export const postItemFactory = (dependencies: any, axios: AxiosStatic) => (text: string) =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) =>
    axios.post(url, {Text: text})
      .then((response: AxiosResponse) =>
        dispatch(dependencies.insertItem(
          response.data.Text,
          response.data.Id)))
      .then(() => dispatch(dependencies.setCallSuccess(ITEM_POST_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(dependencies.setCallError(ITEM_POST_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
