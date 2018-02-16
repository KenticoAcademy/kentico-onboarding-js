import { IItemSyncInfo } from '../interfaces/IItemSyncInfo';
import { SyncState } from '../enums/SyncState';
import { SyncOperation } from '../enums/SyncOperation';
import { TypedRecord } from './TypedRecord';
import { defaultUuid } from '../../constants/defaultUuid';

const defaultItem: IItemSyncInfo = {
  id: defaultUuid,
  operation: SyncOperation.Add,
  state: SyncState.Synced,
  description: '',
};

export class ItemSyncInfo extends TypedRecord(defaultItem) implements IItemSyncInfo {
  readonly id: string;
  readonly operation: SyncOperation;
  readonly state: SyncState;
  readonly description: string;
}
