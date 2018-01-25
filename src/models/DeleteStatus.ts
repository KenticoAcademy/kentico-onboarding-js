import { Record } from 'immutable';
import { IDeleteStatus } from './IDeleteStatus';


const emptyStatus: IDeleteStatus = {
  hasError: false,
  errorMessage: ''
};

export class DeleteStatus extends Record(emptyStatus) implements IDeleteStatus {
  hasError: boolean;
  errorMessage: string;

  constructor(params?: Partial<IDeleteStatus>) {
    params ? super(params) : super();
  }

  with(values: Partial<IDeleteStatus>) {
    return this.merge(values) as this;
  }
}
