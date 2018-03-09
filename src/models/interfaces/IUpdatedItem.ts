import { Guid } from '../Guid';

export interface IUpdatedItem {
  id: Guid;
  text: string;
  syncedText: string;
}
