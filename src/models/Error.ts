import { defaultId, Uuid } from '../utils/generateId';
import { BaseRecord } from './BaseRecord';

export const emptyError: IError = {
  id: defaultId,
  errorMessage: '',
  action: '',
  backupText: ''
};

export interface IError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly action: string;
  readonly backupText: string;
}

export class Error extends BaseRecord(emptyError) implements IError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly action: string;
  readonly backupText: string;
}
