import {
  addNewItemRequest,
  deleteItemRequest,
  addNewItemConfirm,
  deleteItemConfirm,
  deleteUnsavedItem,
  itemSyncFailed,
  saveItemChangesConfirm,
  receiveItems,
  saveItemChangesRequest,
  revertAdd,
  revertModify,
  revertDelete,
  revertDeleteAfterFailedModify,
} from '../../../../src/actions';
import { IListItem } from '../../../../src/models/interfaces/IListItem';
import { itemsSyncInfo } from '../../../../src/reducers/list/itemsSyncInfo/itemsSyncInfo';
import { OrderedMap } from 'immutable';
import { Guid } from '../../../../src/models/Guid';
import { ItemSyncInfo } from '../../../../src/models/classes/ItemSyncInfo';
import { ListItem } from '../../../../src/models/classes/ListItem';
import { SyncOperation } from '../../../../src/models/enums/SyncOperation';
import { SyncState } from '../../../../src/models/enums/SyncState';
import deepFreeze = require('deep-freeze');
import { IAddedItemConfirmed } from '../../../../src/models/interfaces/IAddedItemConfirmed';
import { IAction } from '../../../../src/models/interfaces/IAction';
import { IUpdatedItem } from '../../../../src/models/interfaces/IUpdatedItem';

describe('itemsSyncInfo', () => {
  it('will create item sync info for all fetched items', () => {
    const initialState = undefined;

    const item1 = new ListItem({
      id: '1',
    });
    const item2 = new ListItem({
      id: '2',
    });
    const items: IListItem[] = [
      item1,
      item2,
    ];

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [item1.id]: new ItemSyncInfo({
        id: item1.id,
        operation: SyncOperation.Default,
        syncState: SyncState.Synced,
      }),
      [item2.id]: new ItemSyncInfo({
        id: item2.id,
        operation: SyncOperation.Default,
        syncState: SyncState.Synced,
      }),
    });

    const action = receiveItems(items);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  [deleteItemConfirm, deleteUnsavedItem, revertAdd]
    .forEach(actionCreator =>
      it('will delete item sync info with existing id', () => {
        const itemSyncInfo1 = new ItemSyncInfo({
          id: '1',
        });
        const itemSyncInfo2 = new ItemSyncInfo({
          id: '2',
        });
        const itemSyncInfo3 = new ItemSyncInfo({
          id: '3',
        });

        const initialState = OrderedMap<Guid, ItemSyncInfo>({
          [itemSyncInfo1.id]: itemSyncInfo1,
          [itemSyncInfo2.id]: itemSyncInfo2,
          [itemSyncInfo3.id]: itemSyncInfo3,
        });
        deepFreeze(initialState);

        const expectedState = OrderedMap<Guid, ItemSyncInfo>({
          [itemSyncInfo1.id]: itemSyncInfo1,
          [itemSyncInfo3.id]: itemSyncInfo3,
        });

        const action = actionCreator(itemSyncInfo2.id);
        const result = itemsSyncInfo(initialState, action);

        expect(result)
          .toEqual(expectedState);
      }));

  it('will change confirmed item to syncState synced', () => {
    const oldId = 'oldId';
    const newId = 'newId';
    const itemSyncInfo = new ItemSyncInfo({
      id: oldId,
      syncState: SyncState.Pending,
      operation: SyncOperation.Add,
    });
    const itemSyncInfoConfirmed = new ItemSyncInfo({
      id: newId,
      syncState: SyncState.Synced,
      operation: SyncOperation.Add,
    });
    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [oldId]: itemSyncInfo,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [newId]: itemSyncInfoConfirmed,
    });

    const actionParams: IAddedItemConfirmed = {
      oldId,
      updatedItem: {
        id: newId,
        isBeingEdited: false,
        text: '',
        syncedText: '',
      },
    };
    const action = addNewItemConfirm(actionParams);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change item sync info to Synced', () => {
    const itemSyncInfo1 = new ItemSyncInfo({
      id: '1',
      operation: SyncOperation.Modify,
      syncState: SyncState.Pending,
    });
    const itemSyncInfo1Succeeded = new ItemSyncInfo({
      id: '1',
      operation: SyncOperation.Modify,
      syncState: SyncState.Synced,
    });
    const itemSyncInfo2 = new ItemSyncInfo({
      id: '2'
    });
    const itemSyncInfo3 = new ItemSyncInfo({
      id: '3'
    });
    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [itemSyncInfo1.id]: itemSyncInfo1,
      [itemSyncInfo3.id]: itemSyncInfo3,
      [itemSyncInfo2.id]: itemSyncInfo2,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [itemSyncInfo1Succeeded.id]: itemSyncInfo1Succeeded,
      [itemSyncInfo3.id]: itemSyncInfo3,
      [itemSyncInfo2.id]: itemSyncInfo2,
    });

    const action = saveItemChangesConfirm(itemSyncInfo1.id);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change item sync info to Unsynced', () => {
    const id = 'id';
    const itemSyncInfo = new ItemSyncInfo({
      id,
      operation: SyncOperation.Delete,
      syncState: SyncState.Pending,
    });
    const itemSyncInfoFailed = new ItemSyncInfo({
      id,
      operation: SyncOperation.Delete,
      syncState: SyncState.Unsynced,
    });
    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [id]: itemSyncInfo,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [id]: itemSyncInfoFailed,
    });

    const action = itemSyncFailed(id);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  it('will add new item sync info', () => {
    const id = 'id';
    const initialState = OrderedMap<Guid, ItemSyncInfo>();
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [id]: new ItemSyncInfo({
        id,
        operation: SyncOperation.Add,
        syncState: SyncState.Pending,
      })
    });

    const mockItem = new ListItem({
      id,
    });
    const action = addNewItemRequest(mockItem);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change item sync info to Pending', () => {
    const id = 'id';
    const itemSyncInfo = new ItemSyncInfo({
      id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Synced,
    });
    const itemSyncInfoPending = new ItemSyncInfo({
      id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Pending,
    });
    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [id]: itemSyncInfo,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [id]: itemSyncInfoPending,
    });

    const action = deleteItemRequest(id);
    const result = itemsSyncInfo(initialState, action);

    expect(result.keySeq())
      .toEqual(expectedState.keySeq());
  });

  it('will change item sync info to Pending', () => {
    const itemSyncInfo1 = new ItemSyncInfo();
    const itemSyncInfo2 = new ItemSyncInfo();
    const itemSyncInfo2Modified = new ItemSyncInfo({
      operation: SyncOperation.Modify,
      syncState: SyncState.Pending,
      id: itemSyncInfo2.id,
    });
    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [itemSyncInfo1.id]: itemSyncInfo1,
      [itemSyncInfo2.id]: itemSyncInfo2,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [itemSyncInfo1.id]: itemSyncInfo1,
      [itemSyncInfo2.id]: itemSyncInfo2Modified,
    });

    const actionParams: IUpdatedItem = {
      id: itemSyncInfo2.id,
      text: '.',
      syncedText: '.',
    };
    const action = saveItemChangesRequest(actionParams);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  it('will not modify state', () => {
    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      '1': new ItemSyncInfo(),
      '2': new ItemSyncInfo(),
    });
    deepFreeze(initialState);

    const expectedState = initialState;

    const action: IAction = {
      type: 'testType',
      payload: null,
    };
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toBe(expectedState);
  });

  it('will set items sync info to empty ordered map', () => {
    const initialState = undefined;
    const expectedState = OrderedMap<Guid, ItemSyncInfo>();

    const action: IAction = {
      type: 'testType',
      payload: null,
    };
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toBe(expectedState);
  });

  [{ actionCreator: revertModify, operation: SyncOperation.Modify }, { actionCreator: revertDelete, operation: SyncOperation.Delete }]
    .forEach(argument =>
      it('will change sync state to synced and operation to default', () => {
        const itemSyncInfo = new ItemSyncInfo({
          id: '1',
          operation: argument.operation,
          syncState: SyncState.Unsynced,
        });

        const newItemSyncInfo = new ItemSyncInfo({
          id: '1',
          operation: SyncOperation.Default,
          syncState: SyncState.Synced,
        });

        const initialState = OrderedMap<Guid, ItemSyncInfo>({
          [itemSyncInfo.id]: itemSyncInfo,
        });
        deepFreeze(initialState);

        const expectedState = OrderedMap<Guid, ItemSyncInfo>({
          [newItemSyncInfo.id]: newItemSyncInfo,
        });

        const action = argument.actionCreator(itemSyncInfo.id);
        const result = itemsSyncInfo(initialState, action);

        expect(result)
          .toEqual(expectedState);
      }));

  it('will change sync operation to modify', () => {
    const itemSyncInfo = new ItemSyncInfo({
      operation: SyncOperation.DeleteAfterFailedModify,
      syncState: SyncState.Unsynced,
      id: 'id',
    });
    const newItemSyncInfo = new ItemSyncInfo({
      id: 'id',
      operation: SyncOperation.Modify,
      syncState: SyncState.Unsynced,
    });

    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [itemSyncInfo.id]: itemSyncInfo,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [newItemSyncInfo.id]: newItemSyncInfo,
    });

    const action = revertDeleteAfterFailedModify(itemSyncInfo.id);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change sync operation to deleteAfterFailedModify', () => {
    const itemSyncInfo = new ItemSyncInfo({
      operation: SyncOperation.Modify,
      syncState: SyncState.Unsynced,
      id: 'id',
    });
    const newItemSyncInfo = new ItemSyncInfo({
      id: 'id',
      operation: SyncOperation.DeleteAfterFailedModify,
      syncState: SyncState.Pending,
    });

    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [itemSyncInfo.id]: itemSyncInfo,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [newItemSyncInfo.id]: newItemSyncInfo,
    });

    const action = deleteItemRequest(itemSyncInfo.id);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change sync state to unsync', () => {
    const itemSyncInfo = new ItemSyncInfo({
      operation: SyncOperation.DeleteAfterFailedModify,
      syncState: SyncState.Pending,
      id: 'id',
    });
    const newItemSyncInfo = new ItemSyncInfo({
      id: 'id',
      operation: SyncOperation.DeleteAfterFailedModify,
      syncState: SyncState.Unsynced,
    });

    const initialState = OrderedMap<Guid, ItemSyncInfo>({
      [itemSyncInfo.id]: itemSyncInfo,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ItemSyncInfo>({
      [newItemSyncInfo.id]: newItemSyncInfo,
    });

    const action = itemSyncFailed(itemSyncInfo.id);
    const result = itemsSyncInfo(initialState, action);

    expect(result)
      .toEqual(expectedState);
  });
});
