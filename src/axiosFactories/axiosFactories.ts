import { AxiosResponse } from 'axios';
import { Uuid } from '../utils/generateId';

interface IAxiosGet {
  get(url: string): Promise<AxiosResponse>;
}

interface IAxiosPost {
  post(url: string, data: { text: string }): Promise<AxiosResponse>;
}

interface IAxiosPut {
  put(url: string, data: { id: Uuid, text: string }): Promise<AxiosResponse>;
}

interface IAxiosDelete {
  delete(url: string): Promise<AxiosResponse>;
}

export const axiosFetchFactory = (axios: IAxiosGet, url: string) =>
  (): Promise<AxiosResponse> =>
    axios.get(url);

export const axiosPostFactory = (axios: IAxiosPost, url: string) =>
  (data: { text: string }): Promise<AxiosResponse> =>
    axios.post(url, data);

export const axiosPutFactory = (axios: IAxiosPut, url: string) =>
  (data: { id: Uuid, text: string }): Promise<AxiosResponse> =>
    axios.put(`${url}/${data.id}`, data);

export const axiosDeleteFactory = (axios: IAxiosDelete, url: string) =>
  (id: Uuid): Promise<AxiosResponse> =>
    axios.delete(`${url}/${id}`);
