import { ItemId } from '../models/ItemId';
import { getApiUrl } from '../constants/url';
import { requestMethodTypes } from '../constants/requestMethodTypes';

const HEADERS = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
};

const applyGetFetch = (apiUrl: RequestInfo) => (): Promise<Response> =>
  fetch(apiUrl, {
    method: requestMethodTypes.GET,
    mode: 'cors', redirect: 'follow',
    headers: HEADERS
  });

const applyPostFetch = (apiUrl: RequestInfo) => (text: string): Promise<Response> =>
  fetch(apiUrl, {
    method: requestMethodTypes.POST,
    headers: HEADERS,
    body: JSON.stringify({
      'Text': text
    })
  });

const applyPutFetch = (apiUrl: RequestInfo) => (id: ItemId, text: string): Promise<Response> =>
  fetch(`${apiUrl}/${id}`, {
    method: requestMethodTypes.PUT,
    headers: HEADERS,
    body: JSON.stringify({
      'Id': id,
      'Text': text
    })
  });

const applyDeleteFetch = (apiUrl: RequestInfo) => (id: ItemId): Promise<Response> =>
  fetch(`${apiUrl}/${id}`, {
    method: requestMethodTypes.DELETE,
    headers: HEADERS,
  });

const applyActionFetch = (method: string): (id?: ItemId, text?: string) => Promise<Response> => {
  const apiUrl: RequestInfo = getApiUrl();

  switch (method) {
    case requestMethodTypes.GET:
      return applyGetFetch(apiUrl) ;
    case requestMethodTypes.POST:
      return applyPostFetch(apiUrl);
    case requestMethodTypes.PUT:
      return applyPutFetch(apiUrl);
    case requestMethodTypes.DELETE:
      return applyDeleteFetch(apiUrl);

    default:
      return this.reject;
  }
};

const applyActionFetchWithErrorHandling = (method: string) => (id?: ItemId, text?: string): Promise<Response> =>
  applyActionFetch(method)(id, text)
    .then(response => response.status >= 400 ? this.reject() : response);

export {applyActionFetchWithErrorHandling as applyActionFetch};
