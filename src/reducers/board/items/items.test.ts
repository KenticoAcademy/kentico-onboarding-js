import { OrderedMap } from 'immutable';
import { items } from './items';
import {
  deleteItem,
  saveTextItem,
} from '../../../actions';
import { Item } from '../../../models/Item';
import { createItemFactory } from '../../../actions/actionCreatorsFactory';

describe('items', () => {
  const dog = new Item({
    id: '1',
    text: 'Dog',
  });

  const cat = new Item({
    id: '2',
    text: 'Cat',
  });

  const doga = new Item({
    id: '1',
    text: 'Doga',
  });

  const initialState = OrderedMap<Guid, Item>();
  const defaultState = OrderedMap<Guid, Item>([[dog.id, dog]]);

  const unknownAction = {
    type: 'UNKNOWN_ACTION',
    payload: 'any',
  };

  it('should return initial state when the input state in undefined', () => {
    const state = items(undefined, unknownAction);

    expect(state).toEqual(initialState);
  });

  it('should return previous state on UNKNOWN_ACTION action', () => {
    const state = items(defaultState, unknownAction);

    expect(state).toEqual(defaultState);
  });

  it('should add a record to empty state on CREATE_ITEM action', () => {
    const createItem = createItemFactory(() => '1');
    const action = createItem(dog.text);

    const state = items(initialState, action);

    expect(state).toEqual(defaultState);
  });

  it('should add second record to state on CREATE_ITEM action', () => {
    const createItem = createItemFactory(() => '2');
    const action = createItem(cat.text);
    const expectedState = defaultState.set(cat.id, cat);

    const state = items(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should change the text in the record Dog on SAVE_TEXT_ITEM action', () => {
    const action = saveTextItem(dog.id, doga.text);
    const expectedState = OrderedMap([[doga.id, doga]]);

    const state = items(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should delete the record Dog on DELETE_ITEM action', () => {
    const action = deleteItem(dog.id);

    const state = items(defaultState, action);

    expect(state).toEqual(initialState);
  });
});
