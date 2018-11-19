import { ModelBase } from './ModelBase';
import { ErrorAction } from '../actions/types/ErrorAction';

export interface IError {
  readonly id: Guid;
  readonly message: string;
  readonly action: ErrorAction;
  readonly oldText: string;
}

const defaultValues: IError = {
  id: '',
  message: '',
  action: ErrorAction.Add,
  oldText: '',
};

export class ItemError extends ModelBase(defaultValues, 'Item Error') implements IError {
  readonly id: Guid;
  readonly message: string;
  readonly action: ErrorAction;
  readonly oldText: string;
}

