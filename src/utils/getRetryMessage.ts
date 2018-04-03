import { SyncOperation } from '../models/enums/SyncOperation';

export const getRetryMessage = (operation: SyncOperation) => {
  switch (operation) {
    case SyncOperation.Add:
      return 'Add failed';
    case SyncOperation.DeleteAfterFailedModify:
      return 'Delete failed';
    case SyncOperation.Delete:
      return 'Delete failed';
    case SyncOperation.Modify:
      return 'Modify failed';
    default:
      return '';
  }
};
