import { GUID_EMPTY } from '../constants/constants';
import { IItem } from './IItem';
import { BaseRecord } from './BaseRecord';
import { key } from '../@types/key';

const defaultItem: IItem = {
  key: GUID_EMPTY,
  value: '',
  isBeingEdited: false,
  temporaryValue: '',
};

export class Item extends BaseRecord<IItem>(defaultItem, 'item') implements IItem {
  readonly key: key;
  readonly value: string;
  readonly isBeingEdited: boolean;
  readonly temporaryValue: string;
}
