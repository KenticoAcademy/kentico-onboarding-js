import { Record } from 'immutable';

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

export class FetchStatus extends Record(emptyStatus) implements IFetchStatus {
  isFetching: boolean;
  hasError: boolean;
  errorMessage: string;

  constructor(params?: Partial<IFetchStatus>) {
    params ? super(params) : super();
  }

  with(values: Partial<IFetchStatus>) {
    return this.merge(values) as this;
  }
}
