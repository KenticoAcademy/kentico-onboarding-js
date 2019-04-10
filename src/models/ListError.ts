import { BaseRecord } from './BaseRecord';
import { ErrorType } from './ErrorType';

export interface IError {
  readonly errorId: Uuid;
  readonly itemId: Uuid;
  readonly action: ErrorType;
}

const emptyError: IError = {
  errorId: '00000000-0000-0000-0000-000000000000',
  itemId: '00000000-0000-0000-0000-000000000000',
  action: ErrorType.DEFAULT,
};

export class ListError extends BaseRecord(emptyError, 'ListError') implements IError {
  readonly errorId: Uuid;
  readonly itemId: Uuid;
  readonly action: ErrorType;
}
