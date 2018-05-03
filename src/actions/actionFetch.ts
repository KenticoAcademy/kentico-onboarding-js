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
      return (id: ItemId, text: string) =>
        fetch(apiUrl, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify({
            'Id': id,
            'Text': text
          })
        });

    case 'DELETE': // TODO
      return (id: ItemId) =>
        fetch(apiUrl + '/' + id , {
          method: 'DELETE',
          headers: HEADERS,
        });

    case 'PUT': // TODO
      return (id: ItemId, text: string) =>
        fetch(apiUrl, {
          method: 'PUT',
          headers: HEADERS,
          body: JSON.stringify({
            'Id': id,
            'Text': text
          })
        });

    default:
      return () => this.reject();
  }
};
