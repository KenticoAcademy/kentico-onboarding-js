import { IItemSyncInfo } from '../../src/models/interfaces/IItemSyncInfo';
import { ItemSyncInfo } from '../../src/models/classes/ItemSyncInfo';
import { SyncOperation } from '../../src/models/enums/SyncOperation';
import { SyncState } from '../../src/models/enums/SyncState';
import { isClickable } from '../../src/utils/isClickable';

describe('isClickable', () => {
  [ SyncOperation.Delete, SyncOperation.DeleteAfterFailedUpdate ]
    .forEach(operation =>
      it('will return false after failed delete', () => {
        const itemSyncInfo: IItemSyncInfo = new ItemSyncInfo({
          operation,
          syncState: SyncState.Desynced,
        });

        const result = isClickable(itemSyncInfo);

        expect(result)
          .toBeFalsy();
      })
    );

  it('will return false when request is pending', () => {
    const itemSyncInfo: IItemSyncInfo = new ItemSyncInfo({
      syncState: SyncState.Pending,
    });

    const result = isClickable(itemSyncInfo);

    expect(result)
      .toBeFalsy();
  });

  it('will return true when item is synced', () => {
    const itemSyncInfo: IItemSyncInfo = new ItemSyncInfo({
      syncState: SyncState.Synced,
    });

    const result = isClickable(itemSyncInfo);

    expect(result)
      .toBeTruthy();
  });
});
