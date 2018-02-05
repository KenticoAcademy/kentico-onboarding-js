import { Record } from 'immutable';
import { defaultId, Uuid } from '../utils/generateId';
import { IListItem } from './IListItem';

const emptyItem: IListItem = {
  id: defaultId,
  text: '',
  backupText: '',
  isEdited: false,
  isSynchronized: true,
  errorMessage: ''
};

export class ListItem extends Record(emptyItem) implements IListItem {
  id: Uuid;
  text: string;
  backupText: string;
  isEdited: boolean;
  isSynchronized: boolean;
  errorMessage: string;

  constructor(params?: Partial<IListItem>) {
    params ? super(params) : super();
  }

  with(values: Partial<IListItem>) {
    return this.merge(values) as this;
  }
}
