import { Promise } from 'es6-promise';

import { getItems } from './itemsApiService';
import { ITEMS_API_URL } from '../constants/constants';

describe('getItems works correctly', () => {
  it('calls correct url and returns json result', () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL) {
          resolve({ ok: true, json: () => json });
        }
      });
    };

    getItems(urlFetch)
      .then((result) => expect(result).toBe(json));
  });

  it('throws error on reject', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((reject: any) => {
        reject(error);
      });
    };

    getItems(urlFetch)
      .catch(result => expect(result).toBe(error));
  });
});
