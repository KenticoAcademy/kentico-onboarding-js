import { TypedRecord } from './TypedRecord';

export interface INewItemError {
  readonly errorMessage: string;
  readonly wasRendered: boolean;
}

const emptyError: INewItemError = {
  errorMessage: '',
  wasRendered: false,
};

export class NewItemError extends TypedRecord<NewItemError, INewItemError>(emptyError, 'Error') implements INewItemError {
  readonly errorMessage: string;
  readonly wasRendered: boolean;
}
