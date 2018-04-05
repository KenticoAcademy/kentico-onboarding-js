import {
  deleteUnsavedItem,
  desyncItem,
  revertAdd,
  revertUpdate,
  revertDelete,
  revertDeleteAfterFailedUpdate,
} from '../../../../src/actions';
import { IListItem } from '../../../../src/models/interfaces/IListItem';
import { itemsSyncInfo } from '../../../../src/reducers/list/itemsSyncInfo/itemsSyncInfo';
import { OrderedMap } from 'immutable';
import { Uuid } from '../../../../src/models/Uuid';
import { ItemSyncInfo } from '../../../../src/models/classes/ItemSyncInfo';
import { ListItem } from '../../../../src/models/classes/ListItem';
import { SyncOperation } from '../../../../src/models/enums/SyncOperation';
import { SyncState } from '../../../../src/models/enums/SyncState';
import deepFreeze = require('deep-freeze');
import { IAddedItemConfirmed } from '../../../../src/models/interfaces/IAddedItemConfirmed';
import { IAction } from '../../../../src/models/interfaces/IAction';
import { IUpdatedItem } from '../../../../src/models/interfaces/IUpdatedItem';
import { receiveFetchedItems } from '../../../../src/actions/thunk/fetchItemsFactory';
import {
  confirmItemDeletion,
  requestItemDeletion,
} from '../../../../src/actions/thunk/deleteItemFactory';
import {
  confirmItemAddition,
  requestItemAddition,
} from '../../../../src/actions/thunk/addItemFactory';
import {
  confirmItemUpdate,
  requestItemUpdate,
} from '../../../../src/actions/thunk/updateItemFactory';

describe('itemsSyncInfo', () => {
  describe('receiveFetchedItems', () => {
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

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
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

      const action = receiveFetchedItems(items);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  [
    { name: 'confirmItemDeletion', creator: confirmItemDeletion },
    { name: 'deleteUnsavedItem', creator: deleteUnsavedItem },
    { name: 'revertAdd', creator: revertAdd }
  ]
    .forEach(action =>
      describe(action.name, () => {
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

          const initialState = OrderedMap<Uuid, ItemSyncInfo>({
            [itemSyncInfo1.id]: itemSyncInfo1,
            [itemSyncInfo2.id]: itemSyncInfo2,
            [itemSyncInfo3.id]: itemSyncInfo3,
          });
          deepFreeze(initialState);

          const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
            [itemSyncInfo1.id]: itemSyncInfo1,
            [itemSyncInfo3.id]: itemSyncInfo3,
          });

          const deleteItemAction = action.creator(itemSyncInfo2.id);
          const result = itemsSyncInfo(initialState, deleteItemAction);

          expect(result)
            .toEqual(expectedState);
        });
      }));

  describe('confirmItemAddition', () => {
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
      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [oldId]: itemSyncInfo,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
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
      const action = confirmItemAddition(actionParams);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('confirmItemUpdate', () => {
    it('will change item sync info to Synced', () => {
      const itemSyncInfo1 = new ItemSyncInfo({
        id: '1',
        operation: SyncOperation.Update,
        syncState: SyncState.Pending,
      });
      const itemSyncInfo1Succeeded = new ItemSyncInfo({
        id: '1',
        operation: SyncOperation.Update,
        syncState: SyncState.Synced,
      });
      const itemSyncInfo2 = new ItemSyncInfo({
        id: '2'
      });
      const itemSyncInfo3 = new ItemSyncInfo({
        id: '3'
      });
      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [itemSyncInfo1.id]: itemSyncInfo1,
        [itemSyncInfo3.id]: itemSyncInfo3,
        [itemSyncInfo2.id]: itemSyncInfo2,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [itemSyncInfo1Succeeded.id]: itemSyncInfo1Succeeded,
        [itemSyncInfo3.id]: itemSyncInfo3,
        [itemSyncInfo2.id]: itemSyncInfo2,
      });

      const action = confirmItemUpdate(itemSyncInfo1.id);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('desyncItem', () => {
    it('will change item sync info to Desynced', () => {
      const id = 'id';
      const itemSyncInfo = new ItemSyncInfo({
        id,
        operation: SyncOperation.Delete,
        syncState: SyncState.Pending,
      });
      const itemSyncInfoFailed = new ItemSyncInfo({
        id,
        operation: SyncOperation.Delete,
        syncState: SyncState.Desynced,
      });
      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [id]: itemSyncInfo,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [id]: itemSyncInfoFailed,
      });

      const action = desyncItem(id);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('requestItemAddition', () => {
    it('will add new item sync info', () => {
      const id = 'id';
      const initialState = OrderedMap<Uuid, ItemSyncInfo>();
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [id]: new ItemSyncInfo({
          id,
          operation: SyncOperation.Add,
          syncState: SyncState.Pending,
        })
      });

      const mockItem = new ListItem({
        id,
      });
      const action = requestItemAddition(mockItem);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('requestItemDeletion', () => {
    it('will change item sync info to Pending', () => {
      const id = 'id';
      const itemSyncInfo = new ItemSyncInfo({
        id,
        operation: SyncOperation.Update,
        syncState: SyncState.Synced,
      });
      const itemSyncInfoPending = new ItemSyncInfo({
        id,
        operation: SyncOperation.Delete,
        syncState: SyncState.Pending,
      });
      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [id]: itemSyncInfo,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [id]: itemSyncInfoPending,
      });

      const action = requestItemDeletion(id);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('requestItemUpdate', () => {
    it('will change item sync info to Pending', () => {
      const itemSyncInfo1 = new ItemSyncInfo();
      const itemSyncInfo2 = new ItemSyncInfo();
      const itemSyncInfo2Modified = new ItemSyncInfo({
        operation: SyncOperation.Update,
        syncState: SyncState.Pending,
        id: itemSyncInfo2.id,
      });
      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [itemSyncInfo1.id]: itemSyncInfo1,
        [itemSyncInfo2.id]: itemSyncInfo2,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [itemSyncInfo1.id]: itemSyncInfo1,
        [itemSyncInfo2.id]: itemSyncInfo2Modified,
      });

      const actionParams: IUpdatedItem = {
        id: itemSyncInfo2.id,
        text: '.',
        syncedText: '.',
      };
      const action = requestItemUpdate(actionParams);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('undefined action', () => {
    it('will not modify state', () => {
      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
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

    it('will set items sync info to empty ordered map if undefined', () => {
      const initialState = undefined;
      const expectedState = OrderedMap<Uuid, ItemSyncInfo>();

      const action: IAction = {
        type: 'testType',
        payload: null,
      };
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toBe(expectedState);
    });
  });

  [
    { actionName: 'revertUpdate', actionCreator: revertUpdate, initialOperation: SyncOperation.Update },
    { actionName: 'revertDelete', actionCreator: revertDelete, initialOperation: SyncOperation.Delete },
  ]
    .forEach(argument =>
      describe(argument.actionName, () => {
        it('will change sync state to synced and operation to default', () => {
          const itemSyncInfo = new ItemSyncInfo({
            id: '1',
            operation: argument.initialOperation,
            syncState: SyncState.Desynced,
          });

          const newItemSyncInfo = new ItemSyncInfo({
            id: '1',
            operation: SyncOperation.Default,
            syncState: SyncState.Synced,
          });

          const initialState = OrderedMap<Uuid, ItemSyncInfo>({
            [itemSyncInfo.id]: itemSyncInfo,
          });
          deepFreeze(initialState);

          const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
            [newItemSyncInfo.id]: newItemSyncInfo,
          });

          const action = argument.actionCreator(itemSyncInfo.id);
          const result = itemsSyncInfo(initialState, action);

          expect(result)
            .toEqual(expectedState);
        });
      }));

  describe('revertDeleteAfterFailedUpdate', () => {
    it('will change sync operation to update', () => {
      const itemSyncInfo = new ItemSyncInfo({
        operation: SyncOperation.DeleteAfterFailedUpdate,
        syncState: SyncState.Desynced,
        id: 'id',
      });
      const newItemSyncInfo = new ItemSyncInfo({
        id: 'id',
        operation: SyncOperation.Update,
        syncState: SyncState.Desynced,
      });

      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [itemSyncInfo.id]: itemSyncInfo,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [newItemSyncInfo.id]: newItemSyncInfo,
      });

      const action = revertDeleteAfterFailedUpdate(itemSyncInfo.id);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('requestItemDeletion', () => {
    it('will change sync operation to deleteAfterFailedModify', () => {
      const itemSyncInfo = new ItemSyncInfo({
        operation: SyncOperation.Update,
        syncState: SyncState.Desynced,
        id: 'id',
      });
      const newItemSyncInfo = new ItemSyncInfo({
        id: 'id',
        operation: SyncOperation.DeleteAfterFailedUpdate,
        syncState: SyncState.Pending,
      });

      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [itemSyncInfo.id]: itemSyncInfo,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [newItemSyncInfo.id]: newItemSyncInfo,
      });

      const action = requestItemDeletion(itemSyncInfo.id);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });

  describe('desyncItem', () => {
    it('will change synced state to desynced', () => {
      const itemSyncInfo = new ItemSyncInfo({
        operation: SyncOperation.DeleteAfterFailedUpdate,
        syncState: SyncState.Pending,
        id: 'id',
      });
      const newItemSyncInfo = new ItemSyncInfo({
        id: 'id',
        operation: SyncOperation.DeleteAfterFailedUpdate,
        syncState: SyncState.Desynced,
      });

      const initialState = OrderedMap<Uuid, ItemSyncInfo>({
        [itemSyncInfo.id]: itemSyncInfo,
      });
      deepFreeze(initialState);

      const expectedState = OrderedMap<Uuid, ItemSyncInfo>({
        [newItemSyncInfo.id]: newItemSyncInfo,
      });

      const action = desyncItem(itemSyncInfo.id);
      const result = itemsSyncInfo(initialState, action);

      expect(result)
        .toEqual(expectedState);
    });
  });
});
