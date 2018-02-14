import { AxiosStatic } from 'axios';

export interface IDependencies {
  readonly getAxios: {axios: AxiosStatic | any, url: string};
}
