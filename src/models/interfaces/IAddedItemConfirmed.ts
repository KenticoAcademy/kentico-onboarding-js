import { Uuid } from '../Uuid';
import { IListItem } from './IListItem';

export interface IAddedItemConfirmed {
  oldId: Uuid;
  updatedItem: IListItem;
}
