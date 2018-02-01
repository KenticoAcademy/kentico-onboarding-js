import { AxiosStatic } from 'axios';
import { IAction } from './IAction';

export interface IDependencies {
  readonly apiCallError: (errorType: string, errorText: string) => IAction;
  readonly getAxios: () => {axios: AxiosStatic | any, url: string};
}
