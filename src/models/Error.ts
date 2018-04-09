import { Record } from 'immutable';
import { defaultId, Uuid } from '../utils/generateId';

const emptyError: IError = {
  id: defaultId,
  errorMessage: ''
};

export interface IError {
  readonly id: Uuid;
  readonly errorMessage: string;
}

export class Error extends Record(emptyError) implements IError {
  id: Uuid;
  errorMessage: string;

  constructor(params?: Partial<IError>) {
    params ? super(params) : super();
  }

  with(values: Partial<IError>) {
    return this.merge(values) as this;
  }
}