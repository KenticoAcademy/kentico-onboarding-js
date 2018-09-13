import { actionTypes } from '../../constants/actionTypes';
import { removeItem } from './removeItem';
import { ItemId } from '../../models/ItemId';
import { mockStore } from '../../../test/utils/mockStore';

describe('removeItem', () => {
  test('calls modifiDeleting, setAsSynchronized, clearErrorMessage, toggleEditing and deleteItem actions if the fetch response was successful', async () => {

    const fetch = jest.fn().mockImplementation((_: ItemId) => Promise.resolve(new Response('', {status: 200})));
    const mockId = () => '42';

    const store = mockStore();
    await store.dispatch<any>(removeItem(fetch)(mockId()));
    const actions = store.getActions();

    expect(actions[0]).toHaveProperty('type', actionTypes.PRE_REMOVE_ITEM);
    expect(actions[1]).toHaveProperty('type', actionTypes.DELETE_ITEM);
  });

  test('calls request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const store = mockStore();
    let rejected = '';
    try {
      await store.dispatch<any>(removeItem(fetch)(mockId()));
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe('Failed to remove');
  });
});
