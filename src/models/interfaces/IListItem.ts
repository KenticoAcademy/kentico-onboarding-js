import { Guid } from '../Guid';

export interface IListItem {
  readonly id: Guid;
  readonly text: string;
  readonly syncedText: string;
  readonly isBeingEdited: boolean;
}
