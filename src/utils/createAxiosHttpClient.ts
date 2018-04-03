import axios, { AxiosResponse } from 'axios';
import { IHttpClient } from '../models/interfaces/IHttpClient';

const getData = <T>(res: AxiosResponse<T>) =>
  res.data;

export const createAxiosHttpClient = (): IHttpClient => ({
  get<T>(url: string): Promise<T> {
    return axios
      .get<T>(url)
      .then(getData);
  },

  delete(url: string): Promise<void> {
    return axios
      .delete(url)
      .then(getData);
  },

  post<T>(url: string, data?: any): Promise<T> {
    return axios
      .post<T>(
        url,
        data
      )
      .then(getData);
  },

  put<T>(url: string, data?: any): Promise<T> {
    return axios
      .put<T>(
        url,
        data
      )
      .then(getData);
  },

  patch<T>(url: string, data?: any): Promise<T> {
    return axios
      .patch<T>(
        url,
        data
      )
      .then(getData);
  },
});
