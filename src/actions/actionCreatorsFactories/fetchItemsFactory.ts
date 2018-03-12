import { AxiosResponse } from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { NO_CONNECTION } from '../../constants/connection';

interface FetchedItem {
  text: string;
  id: Uuid;
  createdAt: string;
  modifiedAt: string;
}

interface IPostDependencies {
  readonly insertItem: (args: { text: string, id: Uuid, isSynchronized: boolean }) => IAction;
  readonly fetchSuccess: () => IAction;
  readonly fetchError: (errorText: string) => IAction;
  readonly axiosFetch: () => Promise<AxiosResponse>;
}

export const fetchItemsFactory =
  ({insertItem, fetchSuccess, fetchError, axiosFetch}: IPostDependencies) =>
    () => async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
      try {
        const response = await axiosFetch();
        response.data.map((item: FetchedItem) =>
          dispatch(insertItem({
            text: item.text,
            id: item.id,
            isSynchronized: true
          })));

        return dispatch(fetchSuccess());
      } catch (error) {
        const errorResponse = error.response;
        const message =
          errorResponse === undefined
            ? NO_CONNECTION
            : `${errorResponse.status} ${errorResponse.statusText}`;

        return dispatch(fetchError(message));
      }
    };
