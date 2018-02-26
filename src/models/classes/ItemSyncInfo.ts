import { IItemSyncInfo } from '../interfaces/IItemSyncInfo';
import { SyncState } from '../enums/SyncState';
import { SyncOperation } from '../enums/SyncOperation';
import { TypedRecord } from './TypedRecord';
import { defaultUuid } from '../../constants/defaultUuid';

const defaultItem: IItemSyncInfo = {
  id: defaultUuid,
  operation: SyncOperation.Add,
  syncState: SyncState.Synced,
};

export class ItemSyncInfo extends TypedRecord(defaultItem) implements IItemSyncInfo {
  readonly id: string;
  readonly operation: SyncOperation;
  readonly syncState: SyncState;
}
