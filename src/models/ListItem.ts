import { Record } from 'immutable';
import { defaultId, Uuid } from '../utils/generateId';

const emptyItem: IListItem = {
  id: defaultId,
  text: '',
  backupText: '',
  isEdited: false,
  isSynchronized: true,
  errorId: defaultId
};

export interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly backupText: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid;
}

export class ListItem extends Record(emptyItem) implements IListItem {
  id: Uuid;
  text: string;
  backupText: string;
  isEdited: boolean;
  isSynchronized: boolean;
  errorId: Uuid;

  constructor(params?: Partial<IListItem>) {
    params ? super(params) : super();
  }

  with(values: Partial<IListItem>) {
    return this.merge(values) as this;
  }
}
