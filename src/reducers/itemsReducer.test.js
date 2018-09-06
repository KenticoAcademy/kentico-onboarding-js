import { OrderedMap } from 'immutable';
import {
  initialState,
<<<<<<< HEAD
  itemsReducer,
=======
  items,
>>>>>>> 2e078d0a... KA-378 Refactor code according to pull-request review
} from './items';
import {
  createItem,
  deleteItem,
  editItem
} from '../actions/actionCreators';
import { ItemRecord } from '../models/ItemRecord';

const idGenerator1 = () => 1;

describe('items', () => {
  const dog = new ItemRecord({
    id: idGenerator1(),
    text: 'Dog'
  });

  const doga = new ItemRecord({
    id: idGenerator1(),
    text: 'Doga'
  });

  const defaultState = initialState.set(dog.id, dog);

  let state;

  it('should return initial state when the input state in undefined', () => {
    state = items(undefined, {});

    expect(state.size).toEqual(0);
    expect(state).toEqual(initialState);
  });

  it('should add a record to empty state on CREATE_ITEM action', () => {
    const name = 'Dog';
    const action = createItem(name);
    state = items(state, action);

    expect(state.size).toEqual(1);
    expect(state.get(action.payload.id).text).toEqual(name);
  });

  it('should add second record to state on CREATE_ITEM action', () => {
    const name = 'Cat';
    const action = createItem(name);
    state = items(state, action);

    expect(state.size).toEqual(2);
    expect(state.get(action.payload.id).text).toEqual(name);
  });

  it('should edit the text in the record Dog on ITEM_EDIT action', () => {
    const action = editItem(dog.id, 'Doga');
    state = items(defaultState, action);

    const expectedState = new OrderedMap().set(doga.id, doga);
    expect(state).toEqual(expectedState);
  });

  it('should return previous state on UNKNOWN_ACTION action', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION'
    };
    state = items(defaultState, unknownAction);
    expect(state).toEqual(defaultState);
  });

  it('should delete the record Dog on DELETE_ITEM action', () => {
    const action = deleteItem(dog.id);
    state = items(defaultState, action);

    const expectedState = new OrderedMap();
    expect(state).toEqual(expectedState);
  });
});
