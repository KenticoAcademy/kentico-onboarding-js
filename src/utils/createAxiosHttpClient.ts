import axios, { AxiosResponse } from 'axios';
import { IHttpClient } from '../models/interfaces/IHttpClient';

const getData = <TResponse>(res: AxiosResponse<TResponse>) =>
  res.data;

export const createAxiosHttpClient = (): IHttpClient => ({
  get<TResponse>(url: string): Promise<TResponse> {
    return axios
      .get<TResponse>(url)
      .then(getData);
  },

  delete(url: string): Promise<void> {
    return axios
      .delete(url)
      .then(getData);
  },

  post<TResponse>(url: string, data?: any): Promise<TResponse> {
    return axios
      .post<TResponse>(
        url,
        data
      )
      .then(getData);
  },

  put<TResponse>(url: string, data?: any): Promise<TResponse> {
    return axios
      .put<TResponse>(
        url,
        data
      )
      .then(getData);
  },

  patch<TResponse>(url: string, data?: any): Promise<TResponse> {
    return axios
      .patch<TResponse>(
        url,
        data
      )
      .then(getData);
  },
});
