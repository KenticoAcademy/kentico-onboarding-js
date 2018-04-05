import { OrderedMap } from 'immutable';
import { Uuid } from '../Uuid';
import { ItemSyncInfo } from '../classes/ItemSyncInfo';

export type ItemsSyncInfoState = OrderedMap<Uuid, ItemSyncInfo>;
