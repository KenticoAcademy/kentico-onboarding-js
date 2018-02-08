import { Guid } from '../Guid';

export interface INewItem {
  readonly id: Guid;
  readonly text: string;
}
