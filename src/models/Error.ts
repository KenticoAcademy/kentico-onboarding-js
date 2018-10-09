import { ModelBase } from './ModelBase';

export interface IError {
  readonly id: Guid;
  readonly message: string;
  readonly action: ErrorAction;
}

const defaultValues: IError = {
  id: '',
  message: '',
  action: 'POST',
};

export class ItemError extends ModelBase(defaultValues, 'Item Error') implements IError {
  readonly id: Guid;
  readonly message: string;
  readonly action: ErrorAction;
}

