import { OrderedMap } from 'immutable';
import { items } from './items';
import {
  deleteItem,
  editItem
} from '../actions/actionCreators';
import { ItemRecord } from '../models/ItemRecord';
import { createItemFactory } from '../actions/actionCreatorsFactory';

const idGenerator1 = () => 1;
const idGenerator2 = () => 2;

describe('items', () => {
  const dog = new ItemRecord({
    id: idGenerator1(),
    text: 'Dog'
  });

  const cat = new ItemRecord({
    id: idGenerator2(),
    text: 'Cat'
  });

  const doga = new ItemRecord({
    id: idGenerator1(),
    text: 'Doga'
  });

  it('should return initial state when the input state in undefined', () => {
    const state = items(undefined, {});
    const expectedState = OrderedMap();

    expect(state.size).toEqual(0);
    expect(state).toEqual(expectedState);
  });

  it('should add a record to empty state on CREATE_ITEM action', () => {
    const name = 'Dog';
    const createItem = createItemFactory(idGenerator1);
    const action = createItem(name);
    let state = OrderedMap();
    const expectedState = OrderedMap([[dog.id, dog]]);

    state = items(state, action);

    expect(state).toEqual(expectedState);
  });

  it('should add second record to state on CREATE_ITEM action', () => {
    const name = 'Cat';
    const createItem = createItemFactory(idGenerator2);
    const action = createItem(name);
    let state = OrderedMap([[dog.id, dog]]);
    const expectedState = state.set(cat.id, cat);

    state = items(state, action);

    expect(state).toEqual(expectedState);
  });

  it('should edit the text in the record Dog on ITEM_EDIT action', () => {
    const action = editItem(dog.id, 'Doga');
    let state = OrderedMap([[dog.id, dog]]);
    const expectedState = OrderedMap([[doga.id, doga]]);

    state = items(state, action);

    expect(state).toEqual(expectedState);
  });

  it('should return previous state on UNKNOWN_ACTION action', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION'
    };
    let state = OrderedMap([[dog.id, dog]]);
    const expectedState = state;

    state = items(state, unknownAction);

    expect(state).toEqual(expectedState);
  });

  it('should delete the record Dog on DELETE_ITEM action', () => {
    const action = deleteItem(dog.id);
    let state = OrderedMap([[dog.id, dog]]);
    const expectedState = OrderedMap();

    state = items(state, action);

    expect(state).toEqual(expectedState);
  });
});
