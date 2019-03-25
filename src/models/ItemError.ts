import { TypedRecord } from './TypedRecord';

export interface IItemError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly wasRendered: boolean;
}

const emptyError: IItemError = {
  id: '',
  errorMessage: '',
  wasRendered: false,
};

export class ItemError extends TypedRecord<ItemError, IItemError>(emptyError, 'Error') implements IItemError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly wasRendered: boolean;
}
