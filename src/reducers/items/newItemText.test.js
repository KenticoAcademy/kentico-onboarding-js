import { newItemText } from './newItemText.ts';
import { addItem } from '../../actions/simpleActions/addItem.ts';
import { updateNewItemText } from '../../actions/simpleActions/updateNewItemText.ts';
import { deleteItem } from '../../actions/simpleActions/deleteItem.ts';

const mockId = () => '2';

describe('newItemText', () => {
  it('returns text that is given in args when the action type is UPDATE_NEW_ITEM', () => {
    const expectedState = 'Some random sentence.';
    const action = updateNewItemText(expectedState);

    const actualState = newItemText(null, action);

    expect(actualState).toEqual(expectedState);
  });

  it('returns empty string when action type is ADD_ITEM', () => {
    const initialState = 'INITIAL_STATE';
    const expectedState = '';
    const action = addItem(mockId, 'Some random sentence.');

    const actualState = newItemText(initialState, action);

    expect(actualState).toEqual(expectedState);
  });

  it('returns empty string when state is not defined', () => {
    const expectedState = '';
    const action = deleteItem('id');

    const actualState = newItemText(undefined, action);

    expect(actualState).toEqual(expectedState);
  });

  it('returns the same value when the action type is unknown', () => {
    const expectedState = 'EXPECTED_STATE';
    const action = deleteItem('id');

    const actualState = newItemText(expectedState, action);

    expect(actualState).toEqual(expectedState);
  });
});
