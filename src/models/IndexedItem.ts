import { defaultId, Uuid } from '../utils/generateId';
import { BaseRecord } from './BaseRecord';

const emptyIndexedItem: IIndexedItem = {
  index: null,
  id: defaultId,
  text: '',
  isEdited: false,
  isSynchronized: false,
  errorId: null
};

export interface IIndexedItem {
  readonly index: number | null;
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid | null;
}

export class IndexedItem extends BaseRecord(emptyIndexedItem) implements IIndexedItem {
  readonly index: number | number;
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid;
}
