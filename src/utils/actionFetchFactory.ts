import { getApiUrl } from '../constants/url';
import { requestMethodTypes } from '../constants/requestMethodTypes';
import {
  deleteFetch,
  getFetch,
  postFetch,
  putFetch
} from '../actions/actionFetch';
import {
  Item,
  ItemFromServer,
} from '../models/Item';

const actionFetchFactory = (method: string): (id?: ItemId, text?: string) => Promise<Response> => {
  const apiUrl: RequestInfo = getApiUrl();

  switch (method) {
    case requestMethodTypes.GET:
      return getFetch(apiUrl);
    case requestMethodTypes.POST:
      return postFetch(apiUrl);
    case requestMethodTypes.PUT:
      return putFetch(apiUrl);
    case requestMethodTypes.DELETE:
      return deleteFetch(apiUrl);

    default:
      return Promise.reject;
  }
};

const actionFetchFactoryWithErrorHandling = (method: string) => (id?: ItemId, text?: string): Promise<Response>&Promise<ItemFromServer>&Promise<Item[]> => {
  let factory;
  if (!id) {
    factory = actionFetchFactory(method)(text);
  }else
  if (!text) {
    factory = actionFetchFactory(method)(id);
  }else
    factory = actionFetchFactory(method)(id, text);

  return factory
    .then(response => response.status >= 400 ? this.reject() : response);
};

export { actionFetchFactoryWithErrorHandling as actionFetchFactory };
