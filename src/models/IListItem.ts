import { Uuid } from '../utils/generateId';

export interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly backupText: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
}
