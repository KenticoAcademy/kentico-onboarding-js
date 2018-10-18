import { OrderedMap } from 'immutable';
import { items } from './items';
import {
  cancelEditItem,
  deleteItem,
  saveTextItem,
  startEditItem,
} from '../../../actions';
import { Item } from '../../../models/Item';
import { createItemFactory } from '../../../actions/actionCreatorsFactory';
import { IAction } from '../../../actions/IAction';

describe('items', () => {
  const dog = new Item({
    id: '1',
    text: 'Dog',
    isEdited: false,
  });

  const dogIsEditedTrue = new Item({
    id: '1',
    text: 'Dog',
    isEdited: true,
  });

  const cat = new Item({
    id: '2',
    text: 'Cat',
    isEdited: false,
  });

  const doga = new Item({
    id: '1',
    text: 'Doga',
    isEdited: false,
  });

  const initialState = OrderedMap<Guid, Item>();
  const defaultState = OrderedMap<Guid, Item>([[dog.id, dog]]);

  const unknownAction: IAction = {
    type: 'UNKNOWN_ACTION',
    payload: 'any',
  };

  it('should return initial state when the input state is undefined', () => {
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

  it('should add second record to state with one Item on CREATE_ITEM action', () => {
    const createItem = createItemFactory(() => '2');
    const action = createItem(cat.text);
    const expectedState = defaultState.set(cat.id, cat);

    const state = items(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should change the text in the Item record on SAVE_TEXT_ITEM action', () => {
    const action = saveTextItem(dog.id, doga.text);
    const expectedState = OrderedMap([[doga.id, doga]]);

    const state = items(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should activate edit on the Item on START_EDIT_ITEM action, when is not active', () => {
    const actionStartEditItemDog = startEditItem(dog.id);
    const expectedState = defaultState.set(dog.id, dogIsEditedTrue);

    const state = items(defaultState, actionStartEditItemDog);

    expect(state).toEqual(expectedState);
  });

  it('should deactivate edit on the Item on CANCEL_EDIT_ITEM action, when is active', () => {
    const actionCancelEditItemDog = cancelEditItem(dog.id);
    const startState = defaultState.set(dog.id, dogIsEditedTrue);

    const state = items(startState, actionCancelEditItemDog);

    expect(state).toEqual(defaultState);
  });

  it('should delete the record Dog on DELETE_ITEM action', () => {
    const action = deleteItem(dog.id);

    const state = items(defaultState, action);

    expect(state).toEqual(initialState);
  });
});
