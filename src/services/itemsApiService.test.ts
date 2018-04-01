import { Promise } from 'es6-promise';

import { getItems } from './itemsApiService';
import { ITEMS_API_URL } from '../constants/constants';

describe('getItems works correctly', () => {
  it('calls correct url', () => {
    const urlFetch = (url: string) => {
      return new Promise<string>((resolve: any, reject: any) => {
        if (url === ITEMS_API_URL) {
          resolve(true);
        }

        reject(false);
      });
    };

    const fetchPromise = getItems(urlFetch);

    let result = false;
    if (fetchPromise) {
      fetchPromise()
        .then(() => result = true)
        .catch(() => result = false);
    }

    expect(result).toBe(true);
  });
});
