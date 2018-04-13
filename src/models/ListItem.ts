import { defaultId, Uuid } from '../utils/generateId';
import { BaseRecord } from './BaseRecord';

const emptyItem: IListItem = {
  id: defaultId,
  text: '',
  backupText: '',
  isEdited: false,
  isSynchronized: true,
  errorId: null
};

export interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly backupText: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid | null;
}

export class ListItem extends BaseRecord(emptyItem) implements IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly backupText: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid;
}
