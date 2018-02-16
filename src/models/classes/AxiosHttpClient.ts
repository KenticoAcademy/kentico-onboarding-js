import axios, { AxiosResponse } from 'axios';
import { IHttpClient } from '../interfaces/IHttpClient';

const getData = <T>(res: AxiosResponse<T>) =>
  res.data;

class AxiosHttpClient implements IHttpClient {
  get = <T>(url: string): Promise<T> =>
    axios
      .get<T>(url)
      .then(getData);

  delete = (url: string): Promise<void> =>
    axios
      .delete(url)
      .then(getData);

  post = <T>(url: string, data?: any): Promise<T> =>
    axios
      .post<T>(url, data)
      .then(getData);

  put = <T>(url: string, data?: any): Promise<T> =>
    axios
      .put<T>(url, data)
      .then(getData);

  patch = <T>(url: string, data?: any): Promise<T> =>
    axios
      .patch<T>(url, data)
      .then(getData);
}

export const httpClient = new AxiosHttpClient();
