import { IListItem } from '../interfaces/IListItem';
import { defaultUuid } from '../../constants/defaultUuid';
import { Record } from 'immutable';
import { Guid } from '../Guid';


const defaultItem: IListItem = {
  id: defaultUuid,
  text: '',
  isBeingEdited: false,
};

export class ListItem extends Record(defaultItem) implements IListItem {
  readonly id: Guid;
  readonly text: string;
  readonly isBeingEdited: boolean;

  constructor(params: Partial<IListItem>) {
    super(params);
  }

  with(params: Partial<IListItem>) {
    return super.merge(params) as this;
  }
}
