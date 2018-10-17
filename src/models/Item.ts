import { ItemId } from './ItemId';
import { BaseRecord } from './BaseRecord';
import { Map } from 'immutable';
import { emptyId } from '../constants/emptyId';

export interface IItem {
  readonly id: ItemId;
  readonly text: string;
  readonly textUpdate: string;
  readonly errorMessages: Map<string, string>;
  readonly isNotSynchronized: boolean;
  readonly isBeingEdited: boolean;
  readonly isBeingDeleted: boolean;
}

export const defaultItem: IItem = {
  id: emptyId,
  text: '',
  textUpdate: '',
  errorMessages: Map<string, string>(),
  isNotSynchronized: false,
  isBeingEdited: false,
  isBeingDeleted: false,
};

export class Item extends BaseRecord<Item>(defaultItem, 'Item') implements IItem {
  readonly id: ItemId;
  readonly text: string;
  readonly textUpdate: string;
  readonly errorMessages: Map<string, string>;
  readonly isNotSynchronized: boolean;
  readonly isBeingEdited: boolean;
  readonly isBeingDeleted: boolean;
}
