import { OrderedMap } from 'immutable';
import {
  initialState,
  itemsReducer,
} from './items';
import {
  itemCreated,
  itemDeleted,
  itemEdited
} from '../actions/actionCreators';
import { ItemRecord } from '../models/ItemRecord';

const idGenerator1 = () => 1;

describe('itemsReducer', () => {
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

  it('should return the initial state', () => {
    state = itemsReducer(undefined, {});
    expect(state.size).toEqual(0);
    expect(state).toEqual(initialState);
  });

  it('should handle ITEM_CREATED on empty state', () => {
    const name = 'Dog';
    const action = itemCreated(name);
    state = itemsReducer(state, action);

    expect(state.size).toEqual(1);
    expect(state.get(action.payload.id).text).toEqual(name);
  });

  it('should handle ITEM_CREATED with one Record in state', () => {
    const name = 'Cat';
    const action = itemCreated(name);
    state = itemsReducer(state, action);

    expect(state.size).toEqual(2);
    expect(state.get(action.payload.id).text).toEqual(name);
  });

  it('should handle ITEM_EDIT', () => {
    const action = itemEdited(dog.id, 'Doga');
    state = itemsReducer(defaultState, action);

    const expectedState = new OrderedMap().set(doga.id, doga);
    expect(state).toEqual(expectedState);
  });

  it('should handle ITEM_DELETED', () => {
    const action = itemDeleted(dog.id);
    state = itemsReducer(defaultState, action);

    const expectedState = new OrderedMap();
    expect(state).toEqual(expectedState);
  });
});
