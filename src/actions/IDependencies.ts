import { AxiosStatic } from 'axios';
import { IAction } from './IAction';

export interface IDependencies {
  readonly apiCallSuccess: (callType: string) => IAction;
  readonly apiCallError: (errorType: string, errorText: string) => IAction;
  readonly url: string;
  readonly axios: AxiosStatic | any;
}
