import { IListItem } from './IListItem';
import { defaultUuid } from '../constants/defaultUuid';
import { Record } from 'immutable';


const defaultItem: IListItem = {
  id: defaultUuid,
  text: '',
  isBeingEdited: false,
};

export class ListItem extends Record(defaultItem) implements IListItem {
  readonly id: string;
  readonly text: string;
  readonly isBeingEdited: boolean;

  constructor(params: Partial<IListItem>) {
    super(params);
  }

  with(params: Partial<IListItem>) {
    return super.merge(params) as this;
  }
}
