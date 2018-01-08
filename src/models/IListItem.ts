import { Uuid } from '../utils/generateId';

export interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
}