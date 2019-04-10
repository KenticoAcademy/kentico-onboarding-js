import { ItemsState } from '../store/types/ItemsState';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { getItemsFactory } from './thunks/getItemsFactory';
import { IFetchedItem } from '../models/IFetchedItem';
import {
  validateDeleteResponse,
  validateGetResponse,
  validatePostResponse,
  validatePutResponse,
} from '../utils/responseValidator';
import { postItemFactory } from './thunks/postItemFactory';
import { deleteItemFactory } from './thunks/deleteItemFactory';
import { putItemFactory } from './thunks/putItemFactory';
import { retryFactory } from './thunks/retryFactory';

const listRoute = '/v1/List/';

const obtainItems =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (): Promise<ItemsState> => {
      const response: Response = await fetch(listRoute);
      const fetchedItems: ReadonlyArray<IFetchedItem> = await validateGetResponse(response);

      return OrderedMap<Uuid, ListItem>(
        fetchedItems.map((item: IFetchedItem) => [item.id, new ListItem(item)]),
      );
    };

const createItem =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (text: string): Promise<IFetchedItem> => {
      const response: Response = await fetch(
        listRoute,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({text}),
        });

      return await validatePostResponse(response);
    };

const removeItem =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (id: Uuid): Promise<void> => {
      const response: Response = await fetch(
        listRoute + id,
        {
          method: 'DELETE',
          body: JSON.stringify({id}),
        });
      validateDeleteResponse(response);
    };

const updateItem =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (id: Uuid, text: string): Promise<IFetchedItem> => {
      const response: Response = await fetch(
        listRoute + id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, text}),
        });

      return await validatePutResponse(response);
    };

export const getItems = getItemsFactory({obtainItems: obtainItems(fetch)});
export const postItem = postItemFactory({createItem: createItem(fetch)});
export const deleteItem = deleteItemFactory({removeItem: removeItem(fetch)});
export const putItem = putItemFactory({updateItem: updateItem(fetch)});
export const retry = retryFactory({postItem, deleteItem, putItem});
