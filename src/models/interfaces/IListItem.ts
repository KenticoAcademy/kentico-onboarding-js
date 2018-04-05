import { Uuid } from '../Uuid';

export interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly syncedText: string;
  readonly isBeingEdited: boolean;
}
