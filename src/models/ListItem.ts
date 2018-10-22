import { Record } from 'immutable';

export interface IListItem {
  id?: string;
  text?: string;
  isInEditMode?: boolean;
}

const defaultListItem: IListItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isInEditMode: false,
};

export class ListItem extends Record(defaultListItem, 'ListItem') implements IListItem {
  readonly id: string;
  readonly text: string;
  readonly isInEditMode: boolean;

  constructor(params?: Partial<IListItem>) {
    params ? super(params) : super();
  }

  with(values: IListItem): ListItem {
    return this.merge(values) as this;
  }
}
