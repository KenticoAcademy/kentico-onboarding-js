import { ItemId } from './ItemId';
import { BaseRecord } from './BaseRecord';

export interface IItem {
  readonly id: ItemId;
  readonly text: string;
  readonly textUpdate: string;
  readonly errorMessage: string;
  readonly synchronized: boolean;
  readonly isBeingEdited: boolean;
  readonly isBeingDeleted: boolean;
}

const emptyId: string = '00000000-0000-0000-0000-000000000000';

export const defaultItem: IItem = {
  id: emptyId,
  text: '',
  textUpdate: '',
  errorMessage: '',
  synchronized: true,
  isBeingEdited: false,
  isBeingDeleted: false,
};

export class Item extends  BaseRecord<Item>(defaultItem, 'Item') implements IItem {
  readonly id: ItemId;
  readonly text: string;
  readonly textUpdate: string;
  readonly errorMessage: string;
  readonly synchronized: boolean;
  readonly isBeingEdited: boolean;
  readonly isBeingDeleted: boolean;
}
