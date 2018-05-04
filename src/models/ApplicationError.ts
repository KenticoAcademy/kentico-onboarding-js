import { FailedAction } from '../enums/FailedAction';
import { AbstractRecord } from './AbstractRecord';

const EMPTY_TEXT = '';

interface IError {
  readonly id: Guid;
  readonly errorDescription: string;
  readonly failedAction: FailedAction;
}

const defaultError: IError = {
  id: '00000000-0000-0000-0000-000000000000',
  errorDescription: EMPTY_TEXT,
  failedAction: FailedAction.NO_FAILURE,
};

export class ApplicationError extends AbstractRecord(defaultError) implements IError {
  readonly id: Guid;
  readonly errorDescription: string;
  readonly failedAction: FailedAction;
}
