import { ItemId } from '../models/ItemId';
import { getApiUrl } from '../constants/url';

const HEADERS = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
};

export const applyGetFetch = (apiUrl: RequestInfo) => (): Promise<Response> =>
  fetch(apiUrl, {
    method: 'GET',
    mode: 'cors', redirect: 'follow',
    headers: HEADERS
  }).then(response => response.status >= 400 ? this.reject() : response);

export const applyPostFetch = (apiUrl: RequestInfo) => (text: string): Promise<Response> =>
  fetch(apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      'Text': text
    })
  }).then(response => response.status >= 400 ? this.reject() : response);

export const applyPutFetch = (apiUrl: RequestInfo) => (id: ItemId, text: string): Promise<Response> =>
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({
      'Id': id,
      'Text': text
    })
  }).then(response => response.status >= 400 ? this.reject() : response);

export const applyDeleteFetch = (apiUrl: RequestInfo) => (id: ItemId): Promise<Response> =>
  fetch(`${apiUrl}'/'${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  }).then(response => response.status >= 400 ? this.reject() : response);

export const applyActionFetch = (method: string): (id?: ItemId, text?: string) => Promise<Response> => {
  const apiUrl: RequestInfo = getApiUrl();

  switch (method) {
    case 'GET':
      return applyGetFetch(apiUrl) ;
    case 'POST':
      return applyPostFetch(apiUrl);
    case 'PUT':
      return applyPutFetch(apiUrl);
    case 'DELETE':
      return applyDeleteFetch(apiUrl);

    default:
      return this.reject;
  }
};
