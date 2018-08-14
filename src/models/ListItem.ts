import { TypedRecord } from './TypedRecord';

export interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isActive: boolean;
}

const emptyListItem: IListItem = {
  id: '',
  text: '',
  isActive: false
};

export class ListItem extends TypedRecord<ListItem, IListItem>(emptyListItem, 'ListItem') implements IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isActive: boolean;
}
