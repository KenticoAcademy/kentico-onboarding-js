import { item } from './item';
import { Item } from '../../models/Item';
import { addItemCreator } from '../../actions/creators/addItemCreator';
import {
  cancelItemUpdating,
  deleteItemError,
  deleteItemSuccess,
  postItemSuccess,
  putItemSuccess,
  saveItemText,
  setItemSyncing,
  toggleItemEditing,
} from '../../actions/itemsActions';
import { addItemErrorCreator } from '../../actions/creators/addItemErrorCreator';

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
      const idGenerator = () => '1';
      const expectedState: Item = new Item({
        id: idGenerator(),
        text,
        isSyncing: true,
      });

      const result: Item = item(previousState, addItemCreator(idGenerator)(text));

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
        oldText: previousState.text,
      });

      const result: Item = item(previousState, saveItemText(previousState.id, text));

      expect(result).toEqual(expectedState);
    });

    it('when not changing text returns item with same oldText', () => {
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
        oldText: 'Learn JS',
      });
      const text: string = previousState.text;
      const expectedState: Item = new Item({
        id: '1',
        text,
        isSyncing: true,
        oldText: 'Learn JS',
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
    it('returns item with isSyncing set to false and empty oldText', () => {
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
        oldText: 'Learn JS',
        isSyncing: true,
        errorId: '42',
      });
      const expectedState: Item = new Item({
        id: '1',
        text: 'Learn react',
        oldText: '',
        isSyncing: false,
      });

      const result: Item = item(previousState, putItemSuccess(previousState.id));

      expect(result).toEqual(expectedState);
    });
  });

  describe('addItemError', () => {
    it('returns item with set errorId', () => {
      const errorId: Guid = '42';
      const previousState: Item = new Item({
        id: '1',
        text: 'Learn react',
      });
      const expectedState: Item = new Item({
        id: '1',
        text: 'Learn react',
        errorId,
      });

      const result: Item = item(previousState, addItemErrorCreator(() => errorId)(previousState.id, '', 'POST'));

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
      const previousState: Item = new Item({
        id,
        text: 'Learn react',
        errorId,
        isSyncing: true,
        isBeingEdited: true,
        oldText: 'Learn JS',
      });
      const expectedState: Item = new Item({
        id,
        text: previousState.oldText,
        errorId: '',
      });

      const result: Item = item(previousState, cancelItemUpdating(id));

      expect(result).toEqual(expectedState);
    });
  });
});
