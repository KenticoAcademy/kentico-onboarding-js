import { Promise } from 'es6-promise';

import { ITEMS_API_URL } from '../constants/constants';
import { Key } from '../@types/Key';

export class ItemsApiService {
  private _fetchService: (url: string) => Promise<Response>;

  constructor(fetchService: (url: string) => Promise<Response>) {
    this._fetchService = fetchService;
  }

  getItems = () => this._fetchService(ITEMS_API_URL)
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._processResponse(response));

  getItem = (key: Key) => null;

  postItem = (itemValue: string) => null;

  putItem = (key: Key, itemValue: string) => null;

  deleteItem = (key: Key) => null;

  private _processResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
}
