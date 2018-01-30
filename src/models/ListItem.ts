import { Record } from 'immutable';
import { defaultId, Uuid } from '../utils/generateId';
import { IListItem } from './IListItem';

const emptyItem: IListItem = {
  id: defaultId,
  text: '',
  isEdited: false,
  isSynchronized: true,
};

export class ListItem extends Record(emptyItem) implements IListItem {
  id: Uuid;
  text: string;
  isEdited: boolean;
  isSynchronized: boolean;

  constructor(params?: Partial<IListItem>) {
    params ? super(params) : super();
  }

  with(values: Partial<IListItem>) {
    return this.merge(values) as this;
  }
}
