import { ItemId } from './ItemId';
import { BaseRecord } from './BaseRecord';

export interface IItem {
  readonly id: ItemId;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly textUpdate: string;
}

const emptyId: string = '00000000-0000-0000-0000-000000000000';

export const defaultItem: IItem = {
  id: emptyId,
  text: '',
  isBeingEdited: false,
  textUpdate: '',
};

export class Item extends  BaseRecord<Item>(defaultItem, 'Item') implements IItem {
  readonly id: ItemId;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly textUpdate: string;
}