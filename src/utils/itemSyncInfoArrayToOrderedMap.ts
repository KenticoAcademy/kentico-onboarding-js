import { OrderedMap } from 'immutable';
import { Guid } from '../models/Guid';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { ItemSyncInfo } from '../models/classes/ItemSyncInfo';

export const itemSyncInfoArrayToOrderedMap = (itemsSyncInfo: IItemSyncInfo[]) =>
  OrderedMap<Guid, ItemSyncInfo>(
    itemsSyncInfo.map(itemSyncInfo => [itemSyncInfo.id, new ItemSyncInfo(itemSyncInfo)])
  );
