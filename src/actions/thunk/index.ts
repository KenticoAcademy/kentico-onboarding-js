import { fetchItemsFactory } from './fetchItemsFactory';
import {
  IPostItemActionParams,
  postItemFactory,
} from './postItemFactory';
import {
  deleteItemFactory,
  IDeleteItemActionParams,
} from './deleteItemFactory';
import {
  IEditItemActionParams,
  editItemFactory,
} from './editItemFactory';
import {
  IThunkAction,
  IThunkActionWithoutParams,
} from '../../models/interfaces/IThunkAction';
import { createNewId } from '../../utils/createNewId';
import { itemCollection } from '../../constants/backendUris';
import { createAxiosHttpClient } from '../../utils/createAxiosHttpClient';

const uri = itemCollection;

const commonDependencies = {
  uri,
  httpClient: createAxiosHttpClient(),
};

export const fetchItemsAsync: IThunkActionWithoutParams = fetchItemsFactory(commonDependencies);

export const postItemAsync: IThunkAction<IPostItemActionParams> = postItemFactory({
  ...commonDependencies,
  createNewId,
});

export const deleteItemAsync: IThunkAction<IDeleteItemActionParams> = deleteItemFactory(commonDependencies);

export const editItemAsync: IThunkAction<IEditItemActionParams> = editItemFactory(commonDependencies);
