import {
  editTextItem,
  createItem,
  startEditItem,
  finishEditItem,
} from '../../../actions';
import { item } from './item';
import { Item } from '../../../models/Item';

describe('item', () => {
  const unknownAction = {
    type: 'UNKNOWN_ACTION',
    payload: 'any',
  };

  it('should return initial state when the input state in undefined', () => {
    const state = item(undefined, unknownAction);
    const expectedState = new Item();

    expect(state).toEqual(expectedState);
  });

  it('should create the Item Dog on CREATE_ITEM action', () => {
    const action = createItem('Dog');
    const defaultState = new Item();
    const expectedState = new Item({id: action.payload.id, text: 'Dog'});

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should edit the text of the Item Dog on EDIT_TEXT_ITEM action', () => {
    const actionCreate = createItem('Dog');
    const action = editTextItem(actionCreate.payload.id, 'Doga');
    const defaultState = new Item({id: actionCreate.payload.id, text: 'Dog'});
    const expectedState = new Item({id: actionCreate.payload.id, text: 'Doga'});

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should activate edit on the Item on START_EDIT_ITEM action, when is not active', () => {
    const actionCreate = createItem('Dog');
    const action = startEditItem(actionCreate.payload.id);
    const defaultState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: false,
    });
    const expectedState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: true,
    });

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should do nothing with the Item on START_EDIT_ITEM action, when is active', () => {
    const actionCreate = createItem('Dog');
    const action = startEditItem(actionCreate.payload.id);
    const defaultState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: true,
    });
    const expectedState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: true,
    });

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should deactivate edit on the Item on FINISH_EDIT_ITEM action, when is active', () => {
    const actionCreate = createItem('Dog');
    const action = finishEditItem(actionCreate.payload.id);
    const defaultState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: true,
    });
    const expectedState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: false,
    });

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should do nothing with the Item on FINISH_EDIT_ITEM action, when is not active', () => {
    const actionCreate = createItem('Dog');
    const action = finishEditItem(actionCreate.payload.id);
    const defaultState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: false,
    });
    const expectedState = new Item({
      id: actionCreate.payload.id, text: 'Dog',
      isEdited: false,
    });

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should return previous state on UNKNOWN_ACTION action', () => {
    const defaultState = new Item({text: 'Dog'});
    const expectedState = defaultState;

    const state = item(defaultState, unknownAction);

    expect(state).toEqual(expectedState);
  });
});
