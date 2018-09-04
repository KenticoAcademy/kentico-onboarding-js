import { OrderedMap } from 'immutable';
import {
  initialState,
} from './itemsReducer';

import {
  itemCreated,
  itemDeleted,
  itemEdited
} from '../actions/actionCreators';
import { ItemRecord } from '../models/ItemRecord';
import listReducer from './listReducer';

const idGenerator1 = () => 1;
const idGenerator2 = () => 2;

describe('listReducer', () => {
  it('should return the initial state', () => {
    expect(listReducer(undefined, {})).toEqual({ items: initialState });
  });

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

  const defaultState = { items: new OrderedMap().set(dog.id, dog) };

  it('should handle ITEM_CREATED on empty state', () => {
    const actionCreatedDog = itemCreated('Dog', idGenerator1);
    const state = listReducer({ items: OrderedMap() }, actionCreatedDog);
    expect(state).toEqual(defaultState);
  });

  it('should handle ITEM_CREATED with one Record', () => {
    const actionCreatedCat = itemCreated('Cat', idGenerator2);
    const state = listReducer(defaultState, actionCreatedCat);
    const expectedStateWithDogCat = { items: defaultState.items.set(cat.id, cat) };
    expect(state).toEqual(expectedStateWithDogCat);
  });

  it('should handle ITEM_EDIT', () => {
    const actionEditDog = itemEdited(idGenerator1(), 'Doga');
    const state = listReducer(defaultState, actionEditDog);
    const expectedState = { items: new OrderedMap().set(doga.id, doga) };
    expect(state).toEqual(expectedState);
  });

  it('should handle ITEM_DELETED', () => {
    const actionDeleteDog = itemDeleted(idGenerator1());
    const state = listReducer(defaultState, actionDeleteDog);
    const expectedState = { items: new OrderedMap() };
    expect(state).toEqual(expectedState);
  });
});
