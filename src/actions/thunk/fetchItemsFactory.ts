import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IFetchedItem } from '../../models/interfaces/IFetchedItem';
import {
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_START,
  ITEMS_FETCH_SUCCESS,
} from '../../constants/actionTypes';

export const startFetchingItems = (): IAction => ({
  type: ITEMS_FETCH_START,
  payload: undefined,
});

export const receiveFetchedItems = (items: IFetchedItem[]): IAction => ({
  type: ITEMS_FETCH_SUCCESS,
  payload: {
    items,
  }
});

export const notifyFailedItemsFetching = (): IAction => ({
  type: ITEMS_FETCH_FAILED,
  payload: undefined,
});

interface IFetchItemsFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
}

export const fetchItemsFactory = ({ uri, httpClient }: IFetchItemsFactoryDependencies) =>
  () =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(startFetchingItems());

      return httpClient.get<IFetchedItem[]>(uri)
        .then(items => dispatch(receiveFetchedItems(items)))
        .catch(() => dispatch(notifyFailedItemsFetching()));
    };
