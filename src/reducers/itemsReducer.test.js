import { OrderedMap } from 'immutable';
import {
  itemsReducer,
  initialState
} from './itemsReducer';
import {
  itemCreated,
  itemDeleted,
  itemEdited
} from '../actions/actionCreators';
import { ItemRecord } from '../models/ItemRecord';

const idGenerator1 = () => 1;
const idGenerator2 = () => 2;

describe('itemsReducers', () => {
  it('should return the initial state', () => {
    expect(itemsReducer(undefined, {})).toEqual(initialState);
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

  it('should handle ITEM_CREATED on undefine state', () => {
    const actionCreatedDog = itemCreated('Dog', idGenerator1);
    const state = itemsReducer(undefined, actionCreatedDog);
    expect(state).toEqual(defaultState);
  });

  it('should handle ITEM_CREATED with one Record', () => {
    const actionCreatedCat = itemCreated('Cat', idGenerator2);
    const state = itemsReducer(defaultState, actionCreatedCat);
    const expectedStateWithDogCat = { items: defaultState.items.set(cat.id, cat) };
    expect(state).toEqual(expectedStateWithDogCat);
  });

  it('should handle ITEM_EDIT', () => {
    const actionEditDog = itemEdited(idGenerator1(), 'Doga');
    const state = itemsReducer(defaultState, actionEditDog);
    const expectedState = { items: new OrderedMap().set(doga.id, doga) };
    expect(state).toEqual(expectedState);
  });

  it('should handle ITEM_DELETED', () => {
    const actionDeleteDog = itemDeleted(idGenerator1());
    const state = itemsReducer(defaultState, actionDeleteDog);
    const expectedState = { items: new OrderedMap() };
    expect(state).toEqual(expectedState);
  });
});
