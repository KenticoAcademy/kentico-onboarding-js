import { ERROR_GET_ITEMS, ITEMS_API_URL } from '../constants/constants';
import { Key } from '../@types/Key';
import * as _fetch from 'isomorphic-fetch';
import { IServerItem } from '../models/IServerItem';

export class IItemsApiService {
  readonly getItems: () => Promise<Array<IServerItem>>;
  readonly getItem: (key: Key) => Promise<Response>;
  readonly postItem: (itemValue: string) => Promise<IServerItem>;
  readonly putItem: (key: Key, itemValue: string) => Promise<Response>;
  readonly deleteItem: (key: Key) => Promise<Response>;
}

export class ItemsApiService implements IItemsApiService {
  private _fetchService: typeof _fetch;

  constructor(fetchService: typeof _fetch) {
     this._fetchService = fetchService;
  }

  getItems = () => this._fetchService(ITEMS_API_URL)
    .catch(() => {
      throw new Error(ERROR_GET_ITEMS);
    })
    .then(response => this._processResponse(response));

  getItem = (key: Key) => this._fetchService(ITEMS_API_URL + key)
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._processResponse(response));

  postItem = (itemValue: string) => this._fetchService(ITEMS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ Text: itemValue }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._processResponse(response));

  putItem = (key: Key, itemValue: string) => this._fetchService(ITEMS_API_URL + key, {
      method: 'PUT',
      body: JSON.stringify(itemValue),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._processResponse(response));

  deleteItem = (key: Key) => this._fetchService(ITEMS_API_URL + key, {
      method: 'DELETE'
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._processResponse(response));

  private _processResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
}
