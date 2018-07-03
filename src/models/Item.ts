import { GUID_EMPTY } from '../constants/constants';
import { IItem } from './Item';
import { BaseRecord } from './BaseRecord';

export interface IItem {
  readonly key: Key;
  readonly value: string;
  readonly isBeingEdited: boolean;
  readonly temporaryValue: string;
}

const defaultItem: IItem = {
  key: GUID_EMPTY,
  value: '',
  isBeingEdited: false,
  temporaryValue: '',
};

export class Item extends BaseRecord<IItem>(defaultItem, 'item') implements IItem {
  readonly key: Key;
  readonly value: string;
  readonly isBeingEdited: boolean;
  readonly temporaryValue: string;
}
