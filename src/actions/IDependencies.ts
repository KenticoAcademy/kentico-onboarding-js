import { AxiosStatic } from 'axios';
import { IAction } from './IAction';
import { Uuid } from '../utils/generateId';

export interface IDependencies {
  insertItem: (text: string, id: Uuid) => IAction;
  setCallSuccess: (callType: string) => IAction;
  setCallError: (errorType: string, errorText: string) => IAction;
  readonly url: string;
  axios: AxiosStatic;
}
