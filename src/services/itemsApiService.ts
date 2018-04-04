import { Promise } from 'es6-promise';

import { ITEMS_API_URL } from '../constants/constants';

const processResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getItems = (fetchService: (url: string) => Promise<Response>) => fetchService(ITEMS_API_URL)
    .catch(error => {
      throw new Error(error);
    })
    .then(response => {
      return processResponse(response);
    });
