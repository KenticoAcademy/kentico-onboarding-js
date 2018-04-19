import { requestedDeleteAfterFailedUpdate } from '../../src/utils/requestedDeleteAfterFailedUpdate';
import { IItemSyncInfo } from '../../src/models/interfaces/IItemSyncInfo';
import { ItemSyncInfo } from '../../src/models/classes/ItemSyncInfo';
import { SyncOperation } from '../../src/models/enums/SyncOperation';
import { SyncState } from '../../src/models/enums/SyncState';

describe('requestedDeleteAfterFailedUpdate', () => {
  [ SyncOperation.Update, SyncOperation.DeleteAfterFailedUpdate ]
    .forEach(previousOperation =>
      it('will return true when new sync operation was delete and old was failing update or delete after update', () => {
        const oldSyncInfo: IItemSyncInfo = new ItemSyncInfo({
          operation: previousOperation,
          syncState: SyncState.Desynced,
        });
        const newSyncInfo: IItemSyncInfo = new ItemSyncInfo({
          operation: SyncOperation.Delete,
        });

        const result = requestedDeleteAfterFailedUpdate(oldSyncInfo, newSyncInfo);

        expect(result)
          .toBeTruthy();
      }));
});
