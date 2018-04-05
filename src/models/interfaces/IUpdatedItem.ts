import { Uuid } from '../Uuid';

export interface IUpdatedItem {
  id: Uuid;
  text: string;
  syncedText: string;
}
