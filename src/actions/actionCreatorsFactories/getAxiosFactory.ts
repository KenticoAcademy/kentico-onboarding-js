import { AxiosStatic } from 'axios';

export const getAxiosFactory = (axios: AxiosStatic | any, url: string) =>
  () => ({
    axios,
    url
  });
