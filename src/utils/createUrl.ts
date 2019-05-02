import { baseUrl } from '../constants/connecting';

export const createUrl = (id?: Guid) => {
  if (id === undefined) {
    return baseUrl;
  }
  return baseUrl + id;
};
