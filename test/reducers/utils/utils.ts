import { IItemSyncRequest } from '../../../src/models/interfaces/IItemSyncRequest';
import { SyncOperation } from '../../../src/models/enums/SyncOperation';

export const mockSyncRequest: IItemSyncRequest = {
  operation: SyncOperation.Modify,
  id: '',
};
