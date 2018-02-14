import { AxiosStatic } from 'axios';

export const getAxiosFactory = (axios: AxiosStatic, url: string) =>
  () => ({
    axios,
    url
  });
