import { BaseRecord } from './BaseRecord';

const emptyStatus: IFetchStatus = {
  isFetching: false,
  hasError: false,
  errorMessage: ''
};

export interface IFetchStatus {
  readonly isFetching: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string;
}

export class FetchStatus extends BaseRecord(emptyStatus) implements IFetchStatus {
  readonly isFetching: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string;
}
