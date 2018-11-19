import { item } from './item';
import { Item } from '../../models/Item';
import {
  addItem,
  addItemError,
  cancelItemUpdating,
  deleteItemError,
  deleteItemSuccess,
  postItemSuccess,
  putItemSuccess,
  saveItemText,
  setItemSyncing,
  toggleItemEditing,
} from '../../actions/itemsActions';
import { ErrorAction } from '../../actions/types/ErrorAction';
import { ItemError } from '../../models/Error';

describe('item', () => {
  it('initializes state with default Item Record value', () => {
    const previousState: Item | undefined = undefined;
    const expectedState: Item = new Item();

    const result: Item = item(previousState, deleteItemSuccess('1'));

    expect(result).toEqual(expectedState);
  });

  describe('addItem', () => {
    it('returns item with correct text', () => {
      const previousState: Item = new Item();
      const text: string = 'Learn redux';
      const itemId: Guid = '1';
      const expectedState: Item = new Item({
        id: itemId,
        text,
        isSyncing: true,
      });

      const result: Item = item(previousState, addItem(itemId, text));

      expect(result).toEqual(expectedState);
    });
  });

  describe('saveItemText', () => {
    it('returns item with saved text', () => {
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
      });
      const text: string = 'Learn redux';
      const expectedState: Item = new Item({
        id: '1',
        text,
        isSyncing: true,
      });

      const result: Item = item(previousState, saveItemText(previousState.id, text));

      expect(result).toEqual(expectedState);
    });
  });

  describe('toggleItemEditing', () => {
    it('returns item with toggled isBeingEdited', () => {
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
      });
      const expectedState: Item = previousState.with({isBeingEdited: true});

      const result: Item = item(previousState, toggleItemEditing(previousState.id));

      expect(result).toEqual(expectedState);
    });
  });

  describe('postItemSuccess', () => {
    it('returns item with new id and isSyncing set to false', () => {
      const previousState: Item = new Item({errorId: '42'});
      const idGenerator = () => '1';
      const expectedState: Item = new Item({
        id: idGenerator(),
        isSyncing: false,
      });

      const result: Item = item(previousState, postItemSuccess('0', idGenerator()));

      expect(result).toEqual(expectedState);
    });
  });

  describe('putItemSuccess', () => {
    it('returns item with isSyncing set to false', () => {
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
        isSyncing: true,
        errorId: '42',
      });
      const expectedState: Item = new Item({
        id: '1',
        text: 'Learn react',
        isSyncing: false,
      });

      const result: Item = item(previousState, putItemSuccess(previousState.id));

      expect(result).toEqual(expectedState);
    });
  });

  describe('addItemError', () => {
    it('returns item with set errorId', () => {
      const errorId: Guid = '42';
      const error: ItemError = new ItemError({
        id: errorId,
        message: '',
        action: ErrorAction.Add,
      });
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
      });
      const expectedState: Item = new Item({
        id: '1',
        text: 'Learn react',
        isSyncing: true,
        errorId,
      });

      const result: Item = item(previousState, addItemError(previousState.id, error));

      expect(result).toEqual(expectedState);
    });
  });

  describe('setItemSyncing', () => {
    it('returns item with set isSyncing', () => {
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
      });
      const expectedState: Item = previousState.with({isSyncing: true});

      const result: Item = item(previousState, setItemSyncing(previousState.id, true));

      expect(result).toEqual(expectedState);
    });
  });

  describe('deleteItemError', () => {
    it('returns item with errorId set to empty string', () => {
      const errorId: Guid = '42';
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
        errorId,
        isSyncing: true,
        isBeingEdited: true,
      });
      const expectedState: Item = new Item({
        id: '1',
        text: 'Learn react',
        errorId: '',
      });

      const result: Item = item(previousState, deleteItemError(errorId));

      expect(result).toEqual(expectedState);
    });
  });

  describe('cancelItemUpdating', () => {
    it('returns item with text set to oldText', () => {
      const id: Guid = '1';
      const errorId: Guid = '42';
      const oldText: string = 'Learn JS';
      const previousState: Item = new Item({
        id,
        text: 'Learn react',
        errorId,
        isSyncing: true,
        isBeingEdited: true,
      });
      const expectedState: Item = new Item({
        id,
        text: oldText,
        errorId: '',
      });

      const result: Item = item(previousState, cancelItemUpdating(id, oldText));

      expect(result).toEqual(expectedState);
    });
  });
});
