import {
  saveTextItem,
  createItem,
  startEditItem,
  cancelEditItem,
} from '../../../actions';
import { item } from './item';
import { Item } from '../../../models/Item';

describe('item', () => {

  const actionCreateItemDog = createItem('Dog');
  const actionStartEditItemDog = startEditItem(actionCreateItemDog.payload.id);
  const actionCancelEditItemDog = cancelEditItem(actionCreateItemDog.payload.id);

  const dogIsEditedFalse = new Item({
    id: actionCreateItemDog.payload.id,
    text: 'Dog',
    isEdited: false,
  });

  const dogIsEditedTrue = new Item({
    id: actionCreateItemDog.payload.id,
    text: 'Dog',
    isEdited: true,
  });

  const unknownAction = {
    type: 'UNKNOWN_ACTION',
    payload: 'any',
  };

  it('should return initial state when the input state in undefined', () => {
    const state = item(undefined, unknownAction);

    expect(state).toEqual(new Item());
  });

  it('should return previous state on UNKNOWN_ACTION action', () => {
    const defaultState = new Item({ text: 'Dog' });
    const expectedState = defaultState;

    const state = item(defaultState, unknownAction);

    expect(state).toEqual(expectedState);
  });

  it('should create the Item Dog on CREATE_ITEM action', () => {
    const action = createItem('Dog');
    const defaultState = new Item();
    const expectedState = new Item({ id: action.payload.id, text: 'Dog' });

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should edit the text of the Item Dog on SAVE_TEXT_ITEM action', () => {
    const actionCreate = createItem('Dog');
    const action = saveTextItem(actionCreate.payload.id, 'Doga');
    const defaultState = new Item({ id: actionCreate.payload.id, text: 'Dog' });
    const expectedState = new Item({ id: actionCreate.payload.id, text: 'Doga' });

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should activate edit on the Item on START_EDIT_ITEM action, when is not active', () => {
    const state = item(dogIsEditedFalse, actionStartEditItemDog);

    expect(state).toEqual(dogIsEditedTrue);
  });

  it('should do nothing with the Item on START_EDIT_ITEM action, when is active', () => {
    const state = item(dogIsEditedTrue, actionStartEditItemDog);

    expect(state).toEqual(dogIsEditedTrue);
  });

  it('should deactivate edit on the Item on CANCEL_EDIT_ITEM action, when is active', () => {
    const state = item(dogIsEditedTrue, actionCancelEditItemDog);

    expect(state).toEqual(dogIsEditedFalse);
  });

  it('should do nothing with the Item on CANCEL_EDIT_ITEM action, when is not active', () => {
    const state = item(dogIsEditedFalse, actionCancelEditItemDog);

    expect(state).toEqual(dogIsEditedFalse);
  });
});
