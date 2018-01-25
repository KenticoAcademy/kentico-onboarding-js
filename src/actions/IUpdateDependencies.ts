import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';
import { AxiosStatic } from 'axios';

export interface IUpdateDependencies {
  readonly updateItem: (id: Uuid, text: string) => IAction;
  readonly setCallSuccess: (callType: string) => IAction;
  readonly setCallError: (errorType: string, errorText: string) => IAction;
  readonly url: string;
  readonly axios: AxiosStatic | any;
}
