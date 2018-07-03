import { ITEMS_API_URL } from '../constants/constants';
import * as _fetch from 'isomorphic-fetch';

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(response.statusText);
};

export const itemsApiService = (fetchService: typeof _fetch) => ({
  getItems: () => fetchService(ITEMS_API_URL)
      .catch(error => {
        throw new Error(error);
      })
      .then(response => checkResponse(response))
      .then(response => response.json()),

  postItem: (itemValue: string) => fetchService(ITEMS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ text: itemValue }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => checkResponse(response))
    .then(response => response.json()),

  putItem: (key: Key, itemValue: string) => fetchService(ITEMS_API_URL + key, {
    method: 'PUT',
    body: JSON.stringify({ text: itemValue }),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .catch(error => {
    throw new Error(error);
  })
  .then(response => checkResponse(response)),

   deleteItem: (key: Key) => fetchService(ITEMS_API_URL + key, { method: 'DELETE' })
    .catch(error => {
      throw new Error(error);
    })
    .then(response => checkResponse(response)),
});
