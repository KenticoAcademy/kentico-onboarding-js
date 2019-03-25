import { TypedRecord } from './TypedRecord';
import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';
import { ItemProperties } from './ItemProperties';


export interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isActive: boolean;
  readonly creationTime: Time;
  readonly lastUpdateTime: Time;
  readonly properties: ItemProperties;
}

const emptyListItem: IListItem = {
  id: '',
  text: '',
  isActive: false,
  creationTime: moment('0000-01-01 00:00:00').format(timeFormat),
  lastUpdateTime: moment('0000-01-01 00:00:00').format(timeFormat),
  properties: new ItemProperties()
};

export class ListItem extends TypedRecord<ListItem, IListItem>(emptyListItem, 'ListItem') implements IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isActive: boolean;
  readonly creationTime: Time;
  readonly lastUpdateTime: Time;
  readonly properties: ItemProperties;
}
