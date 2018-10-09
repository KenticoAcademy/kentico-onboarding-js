import { ModelBase } from './ModelBase';

export interface IItem {
  readonly id: Guid;
  readonly text: string;
  readonly oldText: string;
  readonly isBeingEdited: boolean;
  readonly isSyncing: boolean;
  readonly errorId: Guid;
}

const defaultValues: IItem = {
  id: '',
  text: 'New item',
  oldText: '',
  isBeingEdited: false,
  isSyncing: false,
  errorId: '',
};

export class Item extends ModelBase(defaultValues, 'Item') implements IItem {
  readonly id: Guid;
  readonly isBeingEdited: boolean;
  readonly text: string;
  readonly oldText: string;
  readonly isSyncing: boolean;
  readonly errorId: Guid;
}

