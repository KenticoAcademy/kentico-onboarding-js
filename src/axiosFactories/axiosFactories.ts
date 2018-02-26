import {
  AxiosResponse,
  AxiosStatic
} from 'axios';
import { Uuid } from '../utils/generateId';

export const axiosFetchFactory = (axios: AxiosStatic, url: string) =>
  (): Promise<AxiosResponse> =>
    axios.get(url);

export const axiosPostFactory = (axios: AxiosStatic, url: string) =>
  (data: { text: string }): Promise<AxiosResponse> =>
    axios.post(url, data);

export const axiosPutFactory = (axios: AxiosStatic, url: string) =>
  (data: { id: Uuid, text: string }): Promise<AxiosResponse> =>
    axios.put(`${url}/${data.id}`, data);

export const axiosDeleteFactory = (axios: AxiosStatic, url: string) =>
  (id: Uuid): Promise<AxiosResponse> =>
    axios.delete(`${url}/${id}`);
