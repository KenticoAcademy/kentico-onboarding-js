import { ItemId } from '../models/ItemId';
import { getApiUrl } from '../constants/url';

const HEADERS = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
};

export const actionFetch = (method: string): (id?: ItemId, text?: string) => Promise<Response> => {
  let apiUrl: RequestInfo = getApiUrl();
  switch (method) {
    case 'GET':
      return () =>
        fetch(apiUrl, {
          method: 'GET',
          mode: 'cors', redirect: 'follow',
          headers: HEADERS
        });

    case 'POST':
      return (text: string) =>
        fetch(apiUrl, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify({
            'Text': text
          })
        });

    default:
      return () => this.reject();
  }
};
