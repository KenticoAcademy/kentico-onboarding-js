import { ITEMS_API_URL } from '../constants/constants';
import * as _fetch from 'isomorphic-fetch';

const checkResponse = (response: Response): Response => {
  if (response.ok) {
    return response;
  }

  throw new Error(response.statusText);
};

const fetchResponse = (fetchService: typeof _fetch, URL: string, configuration: RequestInit): Promise<Response> =>
  fetchService(URL, configuration)
    .then(response => {
      if (!response) {
        throw new Error('empty response');
      }

      return checkResponse(response);
    });

export const itemsApiService = (fetchService: typeof _fetch) => ({
  getItems: () => fetchResponse(fetchService, ITEMS_API_URL, { method: 'GET' })
      .then(response => response.json()),

  postItem: (itemValue: string) => fetchResponse(fetchService, ITEMS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ text: itemValue }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()),

  putItem: (key: Key, itemValue: string) => fetchResponse(fetchService, ITEMS_API_URL + key, {
    method: 'PUT',
    body: JSON.stringify({ text: itemValue }),
    headers: {
      'Content-Type': 'application/json'
    },
  }),

  deleteItem: (key: Key) => fetchResponse(fetchService, ITEMS_API_URL + key, { method: 'DELETE' }),
});
