import { ITEMS_API_URL } from '../constants/constants';
import { Key } from '../@types/Key';
import * as _fetch from 'isomorphic-fetch';
import { IServerItem } from '../models/IServerItem';

export class IItemsApiService {
  readonly getItems: () => Promise<Array<IServerItem>>;
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
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._checkResponse(response))
    .then(response => response.json());

  postItem = (itemValue: string) => this._fetchService(ITEMS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ text: itemValue }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._checkResponse(response))
    .then(response => response.json());

  putItem = (key: Key, itemValue: string) => this._fetchService(ITEMS_API_URL + key, {
      method: 'PUT',
      body: JSON.stringify({ text: itemValue }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._checkResponse(response))

  deleteItem = (key: Key) => this._fetchService(ITEMS_API_URL + key, {
      method: 'DELETE'
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._checkResponse(response))

  private _checkResponse = (response: Response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(response.statusText);
  };
}
