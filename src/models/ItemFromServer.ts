import { ItemId } from './ItemId';
export type ItemFromServer = {
  Id: ItemId;
  Text: string;
  CreatedAt: Date;
  LastChange: Date;
};

