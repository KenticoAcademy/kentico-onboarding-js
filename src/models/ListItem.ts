import { BaseRecord } from './BaseRecord';

export interface IListItem {
  id: Uuid;
  text: string;
  isInEditMode: boolean;
}

const defaultListItem: IListItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isInEditMode: false,
};

export class ListItem extends BaseRecord(defaultListItem, 'ListItem') implements IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isInEditMode: boolean;
}
