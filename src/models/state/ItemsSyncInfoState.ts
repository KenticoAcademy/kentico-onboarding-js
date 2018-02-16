import { OrderedMap } from 'immutable';
import { Guid } from '../Guid';
import { ItemSyncInfo } from '../classes/ItemSyncInfo';

export type ItemsSyncInfoState = OrderedMap<Guid, ItemSyncInfo>;
