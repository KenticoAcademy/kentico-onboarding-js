import { TypedRecord } from './TypedRecord';
import { IRequestError } from '../interfaces/IRequestError';

export interface IItemFlags {
  readonly isBeingEdited: boolean;
  readonly isStored: boolean;
  readonly requestError: IRequestError | null;
}

const defaultItemFlags: IItemFlags = {
  isBeingEdited: false,
  isStored: false,
  requestError: null,
};

export class ItemFlags extends TypedRecord<IItemFlags, ItemFlags>(defaultItemFlags, 'ItemFlags') implements IItemFlags {
  readonly isBeingEdited: boolean;
  readonly isStored: boolean;
  readonly requestError: IRequestError | null;
}
