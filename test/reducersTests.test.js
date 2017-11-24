import { OrderedMap } from 'immutable';
import { ListItemRecord } from '../src/models/ListItemRecord';
import deepFreeze from 'deep-freeze';
import { reducers } from '../src/reducers';
import * as actions from '../src/actionCreators';

describe('reducers', () => {
  it('It should add new ListItemRecord to OrderedMap', () => {
    const initialState = { items: OrderedMap() };

    const id = 'test';
    const text = 'text';
    const expectedState = {
      items: OrderedMap(
        { [id]: new ListItemRecord({ id, text }) },
      ),
    };

    deepFreeze(initialState);

    expect(reducers(initialState, actions.createItem({ itemId: id, text })))
      .toEqual(expectedState);
  });

  it('It should set ListItemRecord to isBeingEdited state', () => {
    const id = 'test';
    const text = 'text';
    const initialState = {
      items: OrderedMap(
        { [id]: new ListItemRecord({ id, text }) },
      ),
    };

    const expectedState = {
      items: OrderedMap(
        { [id]: new ListItemRecord({ id, text, isBeingEdited: true }) },
      ),
    };

    deepFreeze(initialState);

    expect(reducers(initialState, actions.clickItem({ itemId: id, selectionRangeStarts: 0, selectionRangeEnds: 0 })))
      .toEqual(expectedState);
  });

  it('It should set ListItemRecord edited state to false and set new text', () => {
    const expectedId = 'test';
    const expectedNewText = 'something else';
    const initialState = {
      items: OrderedMap(
        { [expectedId]: new ListItemRecord({ id: expectedId, text: 'something', isBeingEdited: true }) },
      ),
    };

    const expectedState = {
      items: OrderedMap(
        { [expectedId]: new ListItemRecord({ id: expectedId, text: expectedNewText, isBeingEdited: false }) },
      ),
    };

    deepFreeze(initialState);

    expect(reducers(initialState, actions.changeItem({ itemId: expectedId, newText: expectedNewText })))
      .toEqual(expectedState);
  });

  it('It should put ListItemRecord to isBeingEdit false', () => {
    const expectedId = 'test';
    const expectedText = 'whatever';
    const initialState = {
      items: OrderedMap(
        { [expectedId]: new ListItemRecord({ id: expectedId, text: expectedText, isBeingEdited: true }) },
      ),
    };

    const expectedState = {
      items: OrderedMap(
        { [expectedId]: new ListItemRecord({ id: expectedId, text: expectedText, isBeingEdited: false }) },
      ),
    };

    deepFreeze(initialState);

    expect(reducers(initialState, actions.cancelItemChange({ itemId: expectedId })))
      .toEqual(expectedState);
  });

  it('It should delete item from records', () => {
    const expectedId = 'test';
    const expectedText = 'also whatever';
    const initialState = {
      items: OrderedMap({
        [expectedId]: new ListItemRecord({ id: expectedId, text: 'whatever', isBeingEdited: true }),
        'other-id': new ListItemRecord({ id: 'other-id', text: expectedText, isBeingEdited: false }),
      }),
    };

    const expectedState = {
      items: OrderedMap({
        'other-id': new ListItemRecord({ id: 'other-id', text: expectedText, isBeingEdited: false }),
      }),
    };

    deepFreeze(initialState);

    expect(reducers(initialState, actions.deleteItem({ itemId: expectedId })))
      .toEqual(expectedState);
  });
});
