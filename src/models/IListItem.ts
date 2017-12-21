import { Guid } from './Guid';

export interface IListItem {
  readonly id: Guid;
  readonly text: string;
  readonly isBeingEdited: boolean;
}
