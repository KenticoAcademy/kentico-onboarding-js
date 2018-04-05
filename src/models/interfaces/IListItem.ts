import { Uuid } from '../Uuid';

export interface IListItem {
  id: Uuid;
  text: string;
  syncedText: string;
  isBeingEdited: boolean;
}
