import { newItemText } from '../../../dist/reducers/items/newItemText';
import {
  deleteItem,
  updateNewItemText,
} from '../../actions/actionCreators.ts';
import { addItemFactory } from '../../actions/addItem.ts';


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
    const action = addItemFactory(mockId)('Some random sentence.');

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
