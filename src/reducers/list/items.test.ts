import { OrderedMap } from 'immutable';
import { items } from './items';
import { IItem, Item } from '../../models/Item';
import { addItemCreator } from '../../actions/creators/addItemCreator';
import {
  deleteItem, fetchItemsSuccess,
  saveItemText,
  toggleItemEditing,
} from '../../actions/itemsActions';
import { IItemsState } from '../../store/state/IItemsState';

describe('items', () => {
  it('initializes state with OrderedMap', () => {
    const previousState: IItemsState | undefined = undefined;
    const expectedState: IItemsState = OrderedMap();

    const result: IItemsState = items(previousState, deleteItem('1'));

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

  describe('deleteItem', () => {
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

      const result: IItemsState = items(previousState, deleteItem('1'));

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

  describe('fetchItemsSuccess', () => {
    it('returns state with received items', () => {
      const response: IItem[] = [
        new Item({ id: '1', text: 'Text1' }),
        new Item({ id: '2', text: 'Text2' }),
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

      const result: IItemsState = items(previousState, fetchItemsSuccess(response));

      expect(result).toEqual(expectedState);
    });
  });
});
