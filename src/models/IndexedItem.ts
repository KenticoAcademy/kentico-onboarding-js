import { Record } from 'immutable';
import { defaultId, Uuid } from '../utils/generateId';

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

export class IndexedItem extends Record(emptyIndexedItem) implements IIndexedItem {
  readonly index: number | null;
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid;

  constructor(params?: Partial<IIndexedItem>) {
    params ? super(params) : super();
  }
}
