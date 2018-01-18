import { Record } from 'immutable';
import { IFetchStatus } from './IFetchStatus';

const emptyStatus: IFetchStatus = {
  isFetching: true,
  hasError: false,
  errorMessage: ''
};

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
