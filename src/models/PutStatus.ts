import { Record } from 'immutable';
import { IPutStatus } from './IPutStatus';

const emptyStatus: IPutStatus = {
  hasError: false,
  errorMessage: ''
};

export class PutStatus extends Record(emptyStatus) implements IPutStatus {
  hasError: boolean;
  errorMessage: string;

  constructor(params?: Partial<IPutStatus>) {
    params ? super(params) : super();
  }

  with(values: Partial<IPutStatus>) {
    return this.merge(values) as this;
  }
}
