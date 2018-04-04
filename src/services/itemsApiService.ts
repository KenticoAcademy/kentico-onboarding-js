import { ITEMS_API_URL } from '../constants/constants';
import { Key } from '../@types/Key';

export class ItemsApiService {
  private _fetchService: typeof fetch;

  constructor(fetchService: typeof fetch = fetch) {
    this._fetchService = fetchService;
  }

  getItems = () => this._fetchService(ITEMS_API_URL)
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._processResponse(response));

  getItem = (key: Key) => this._fetchService(ITEMS_API_URL + key)
    .catch(error => {
      throw new Error(error);
    })
    .then(response => this._processResponse(response));

  postItem = (itemValue: string) => this._fetchService(ITEMS_API_URL, {
      method: 'POST',
      body: JSON.stringify(itemValue),
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
