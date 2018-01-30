import { Record } from 'immutable';
import { defaultId, Uuid } from '../utils/generateId';
import { IIndexedItem } from './IIndexedItem';

const emptyIndexedItem: IIndexedItem = {
  index: null,
  id: defaultId,
  text: '',
  isEdited: false,
  isSynchronized: false,
};

export class IndexedItem extends Record(emptyIndexedItem) implements IIndexedItem {
  readonly index: number | null;
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;

  constructor(params?: Partial<IIndexedItem>) {
    params ? super(params) : super();
  }
}
