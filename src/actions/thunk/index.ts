import { fetchItemsFactory } from './fetchItemsFactory';
import {
  IAddItemActionParams,
  addItemFactory,
} from './addItemFactory';
import {
  deleteItemFactory,
  IDeleteItemActionParams,
} from './deleteItemFactory';
import {
  IUpdateItemActionParams,
  updateItemFactory,
} from './updateItemFactory';
import {
  IThunkAction,
  IThunkActionWithoutParams,
} from '../../models/interfaces/IThunkAction';
import  * as createNewId from 'uuid/v4';
import { itemCollection } from '../../constants/backendUris';
import { createAxiosHttpClient } from '../../utils/createAxiosHttpClient';

const uri = itemCollection;

const commonDependencies = {
  uri,
  httpClient: createAxiosHttpClient(),
};

export const fetchItemsAsync: IThunkActionWithoutParams = fetchItemsFactory(commonDependencies);

export const addItemAsync: IThunkAction<IAddItemActionParams> = addItemFactory({
  ...commonDependencies,
  createNewId,
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory(commonDependencies);

export const updateItemAsync: IThunkAction<IUpdateItemActionParams> = updateItemFactory(commonDependencies);
