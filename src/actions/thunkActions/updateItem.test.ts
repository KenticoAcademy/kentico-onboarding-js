import { actionTypes } from '../../constants/actionTypes';
import { updateItem } from './updateItem';
import { ItemId } from '../../models/ItemId';
import { mockStore } from '../../../test/utils/mockStore';

describe('CreateUpdateItem', () => {
  test('calls request, addItem and success action if the fetch response was successful', async () => {

    const fetch = jest.fn().mockImplementation((id: ItemId, text: string) => Promise.resolve(new Response('{"body":[{"Id":"' + id + '","Text":"' + text + '"}]}', {status: 200})));
    const mockId = () => '42';

    const store = mockStore();
    await store.dispatch<any>(updateItem(fetch)(mockId(), 'Karel'));
    const actions = store.getActions();

    expect(actions[0]).toHaveProperty('type', actionTypes.PRE_UPDATE_ITEM);
    expect(actions[1]).toHaveProperty('type', actionTypes.TOGGLE_SYNCHRONIZED);
  });

  test('calls request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const store = mockStore();
    let rejected = '';
    try {
      await store.dispatch<any>(updateItem(fetch)(mockId(), 'Karel'));
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe('Failed to update');
  });
});
