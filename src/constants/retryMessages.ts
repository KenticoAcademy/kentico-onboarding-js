import { SyncOperation } from '../models/enums/SyncOperation';

export const retryMessages = Object.freeze({
  [SyncOperation.Add]: 'Add failed',
  [SyncOperation.DeleteAfterFailedModify]: 'Delete failed',
  [SyncOperation.Delete]: 'Delete failed',
  [SyncOperation.Modify]: 'Modify failed',
  [SyncOperation.Default]: '',
});
