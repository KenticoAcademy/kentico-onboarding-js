import { AxiosResponse } from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import {
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_SUCCEEDED
} from '../../constants/actionTypes';

export interface IFetchedItem {
  text: string;
  id: Uuid;
  createdAt: string;
  modifiedAt: string;
}

interface IPostDependencies {
  readonly axiosFetch: () => Promise<AxiosResponse>;
  readonly getErrorMessage: (errorResponse: AxiosResponse) => string;
}

export const fetchSucceeded = (items: Array<IFetchedItem>): IAction => ({
  type: ITEMS_FETCH_SUCCEEDED,
  payload: {
    items,
  }
});

export const fetchFailed = (errorText: string): IAction => ({
  type: ITEMS_FETCH_FAILED,
  payload: {
    errorText
  }
});

export const fetchItemsFactory =
  ({axiosFetch, getErrorMessage }: IPostDependencies) =>
    () => async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
      try {
        const response = await axiosFetch();

        return dispatch(fetchSucceeded(response.data));
      } catch (error) {
        const message = getErrorMessage(error.response);

        return dispatch(fetchFailed(message));
      }
    };
