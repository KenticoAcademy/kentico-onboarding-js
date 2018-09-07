import { OrderedMap } from 'immutable';
import { items } from './items';
import {
  deleteItem,
  editItem
} from '../../actions/actionCreators';
import { Item } from '../../models/ItemRecord';
import { createItemFactory } from '../../actions/actionCreatorsFactory';

const idGenerator1 = () => 1;
const idGenerator2 = () => 2;

describe('items', () => {
  const dog = new Item({
    id: idGenerator1(),
    text: 'Dog'
  });

  const cat = new Item({
    id: idGenerator2(),
    text: 'Cat'
  });

  const doga = new Item({
    id: idGenerator1(),
    text: 'Doga'
  });

  const defaultState = OrderedMap([[dog.id, dog]]);

  it('should return initial state when the input state in undefined', () => {
    const state = items(undefined, {});
    const expectedState = OrderedMap();

    expect(state).toEqual(expectedState);
  });

  it('should add a record to empty state on CREATE_ITEM action', () => {
    const name = 'Dog';
    const createItem = createItemFactory(idGenerator1);
    const action = createItem(name);
    const expectedState = OrderedMap([[dog.id, dog]]);

    const state = items(OrderedMap(), action);

    expect(state).toEqual(expectedState);
  });

  it('should add second record to state on CREATE_ITEM action', () => {
    const name = 'Cat';
    const createItem = createItemFactory(idGenerator2);
    const action = createItem(name);
    const expectedState = defaultState.set(cat.id, cat);

    const state = items(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should isEdited the text in the record Dog on ITEM_EDIT action', () => {
    const action = editItem(dog.id, 'Doga');
    const expectedState = OrderedMap([[doga.id, doga]]);

    const state = items(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should return previous state on UNKNOWN_ACTION action', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION'
    };
    const expectedState = defaultState;

    const state = items(defaultState, unknownAction);

    expect(state).toEqual(expectedState);
  });

  it('should delete the record Dog on DELETE_ITEM action', () => {
    const action = deleteItem(dog.id);
    const expectedState = OrderedMap();

    const state = items(defaultState, action);

    expect(state).toEqual(expectedState);
  });
});
