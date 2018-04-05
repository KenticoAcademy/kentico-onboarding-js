import { AxiosResponse } from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { NO_CONNECTION } from '../../constants/connection';
import { insertItem } from './postItemFactory';
import {
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_SUCCEEDED
} from '../../constants/actionTypes';

interface IFetchedItem {
  text: string;
  id: Uuid;
  createdAt: string;
  modifiedAt: string;
}

interface IPostDependencies {
  readonly axiosFetch: () => Promise<AxiosResponse>;
}

export const fetchSucceeded = (): IAction => ({
  type: ITEMS_FETCH_SUCCEEDED
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
        response.data.map((item: IFetchedItem) =>
          dispatch(insertItem({
            text: item.text,
            id: item.id,
            isSynchronized: true
          })));

        return dispatch(fetchSucceeded());
      } catch (error) {
        const errorResponse = error.response;
        const message =
          errorResponse === undefined
            ? NO_CONNECTION
            : `${errorResponse.status} ${errorResponse.statusText}`;

        return dispatch(fetchFailed(message));
      }
    };
