import { BaseRecord } from './BaseRecord';

export interface IStatusType {
  readonly isFetching: boolean;
  readonly errorMessage: string;
}

export const DEFAULT_VALUE: IStatusType = {
  isFetching: false,
  errorMessage: '',
};

export class StatusType extends BaseRecord<StatusType>(DEFAULT_VALUE, 'Status') implements IStatusType {
  readonly isFetching: boolean;
  readonly errorMessage: string;
}
