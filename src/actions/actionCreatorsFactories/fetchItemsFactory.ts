import { AxiosResponse } from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import {
  NO_CONNECTION,
  SERVER_CONNECTION_PROBLEM
} from '../../constants/connection';
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
  ({axiosFetch}: IPostDependencies) =>
    () => async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
      try {
        const response = await axiosFetch();

        return dispatch(fetchSucceeded(response.data));
      } catch (error) {
        const errorResponse = error.response;
        const message =
          errorResponse === undefined
            ? NO_CONNECTION
            : SERVER_CONNECTION_PROBLEM;

        return dispatch(fetchFailed(message));
      }
    };
