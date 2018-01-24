import { AxiosStatic } from 'axios';
import { IAction } from './IAction';
import { Uuid } from '../utils/generateId';

export interface IDependencies {
  readonly insertItem: (text: string, id: Uuid) => IAction;
  readonly setCallSuccess: (callType: string) => IAction;
  readonly setCallError: (errorType: string, errorText: string) => IAction;
  readonly url: string;
  readonly axios: AxiosStatic | any;
}
