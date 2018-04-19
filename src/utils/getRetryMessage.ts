import { SyncOperation } from '../models/enums/SyncOperation';

export const getRetryMessage = (operation: SyncOperation) => {
  switch (operation) {
    case SyncOperation.Add:
      return 'Add failed';
    case SyncOperation.DeleteAfterFailedUpdate:
      return 'Delete failed';
    case SyncOperation.Delete:
      return 'Delete failed';
    case SyncOperation.Update:
      return 'Update failed';
    default:
      throw `Invalid sync operation: ${operation}`;
  }
};
