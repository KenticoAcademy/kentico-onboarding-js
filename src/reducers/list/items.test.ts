import { OrderedMap } from 'immutable';
import { items } from './items';
import { IItem, Item } from '../../models/Item';
import { addItemCreator } from '../../actions/creators/addItemCreator';
import {
  cancelItemUpdating,
  deleteItemError,
  deleteItemSuccess,
  loadingItemsSuccess,
  postItemSuccess,
  putItemSuccess,
  saveItemText,
  setItemSyncing,
  toggleItemEditing,
} from '../../actions/itemsActions';
import { IItemsState } from '../../store/state/IItemsState';
import { addItemErrorCreator } from '../../actions/creators/addItemErrorCreator';

describe('items', () => {
  it('initializes state with OrderedMap', () => {
    const previousState: IItemsState | undefined = undefined;
    const expectedState: IItemsState = OrderedMap();

    const result: IItemsState = items(previousState, deleteItemSuccess('1'));

    expect(result).toEqual(expectedState);
  });

  describe('addItem', () => {
    it('returns state with correct text', () => {
      const previousState: IItemsState = OrderedMap();
      const text: string = 'Learn redux';
      const idGenerator = () => '1';
      const expectedState: IItemsState = OrderedMap([
        [
          idGenerator(),
          new Item({
            id: idGenerator(),
            text,
            isSyncing: true,
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, addItemCreator(idGenerator)(text));

      expect(result).toEqual(expectedState);
    });
  });

  describe('saveItemText', () => {
    it('returns state with changed item text', () => {
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
            isSyncing: false,
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);
      const text: string = 'Learn redux';
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text,
            isSyncing: true,
            oldText: previousState.get('1').text,
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, saveItemText('1', text));

      expect(result).toEqual(expectedState);
    });
  });

  describe('deleteItemSuccess', () => {
    it('returns state with deleted item', () => {
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, deleteItemSuccess('1'));

      expect(result.has('1')).toBeFalsy();
      expect(result).toEqual(expectedState);
    });
  });

  describe('toggleItemEditing', () => {
    it('returns state with toggled item\'s editing', () => {
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
            isBeingEdited: true,
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, toggleItemEditing('2'));

      expect(result).toEqual(expectedState);
    });
  });

  describe('loadingItemsSuccess', () => {
    it('returns state with received items', () => {
      const response: IItem[] = [
        new Item({id: '1', text: 'Text1'}),
        new Item({id: '2', text: 'Text2'}),
      ];
      const previousState: IItemsState = OrderedMap();
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Text1',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Text2',
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, loadingItemsSuccess(response));

      expect(result).toEqual(expectedState);
    });
  });

  describe('putItemSuccess', () => {
    it('returns state with items\'s isSyncing set to false and empty oldText', () => {
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
            isSyncing: true,
            oldText: 'Learn JS',
            errorId: '42',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
            isSyncing: false,
            oldText: '',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, putItemSuccess('1'));

      expect(result).toEqual(expectedState);
    });
  });

  describe('postItemSuccess', () => {
    it('returns state with item with oldId replaced with new item', () => {
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
            isSyncing: true,
            errorId: '42',
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '3',
          new Item({
            id: '3',
            text: 'Write app',
            isSyncing: false,
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, postItemSuccess('2', '3'));

      expect(result).toEqual(expectedState);
    });
  });

  describe('setItemSyncing', () => {
    it('returns state with toggled item\'s editing', () => {
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
            isSyncing: true,
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, setItemSyncing('2', true));

      expect(result).toEqual(expectedState);
    });
  });

  describe('cancelItemUpdating', () => {
    it('returns state with toggled item\'s editing', () => {
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
            errorId: '42',
            isSyncing: true,
            isBeingEdited: true,
            oldText: 'Learn JS',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn JS',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, cancelItemUpdating('1'));

      expect(result).toEqual(expectedState);
    });
  });

  describe('addItemError', () => {
    it('returns state with items\'s set errorId', () => {
      const errorId: Guid = '42';
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
            errorId,
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, addItemErrorCreator(() => errorId)('1', '', 'POST'));

      expect(result).toEqual(expectedState);
    });
  });

  describe('deleteItemError', () => {
    it('returns state with items\'s set errorId', () => {
      const errorId: Guid = '42';
      const previousState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
            errorId,
          }),
        ],
      ]);
      const expectedState: IItemsState = OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Learn react',
          }),
        ],
        [
          '2',
          new Item({
            id: '2',
            text: 'Write app',
          }),
        ],
      ]);

      const result: IItemsState = items(previousState, deleteItemError(errorId));

      expect(result).toEqual(expectedState);
    });
  });
});
