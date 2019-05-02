import { baseRecord } from './baseRecord';
import { ItemType } from './ItemType';

const defaultRecord: ItemType = {
  text: '',
  id: '',
  isEdited: false,
  isFetching: false,
};

export class ListItem extends baseRecord<ItemType>(defaultRecord, 'ListItem') implements ItemType {
  readonly id: Guid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isFetching: boolean;

  constructor(props: ItemType = defaultRecord) {
    super(props);
  }
}
