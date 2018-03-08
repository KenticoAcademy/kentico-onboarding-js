import { Guid } from '../Guid';
import { IListItem } from './IListItem';

export interface IAddedItemConfirmed {
  oldId: Guid;
  updatedItem: IListItem;
}
