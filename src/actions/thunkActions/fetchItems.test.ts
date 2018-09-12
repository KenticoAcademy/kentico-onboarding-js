import { fetchItems } from './fetchItems';
import { actionTypes } from '../../constants/actionTypes';
import { mockStore } from '../../../test/utils/mockStore';

describe('fetchItems', () => {
  test('calls request and success action if the fetch response was successful', async () => {
    const fetch = jest.fn().mockImplementation(() => Promise.resolve(new Response('{"body": [{"Id":"1","Text":"TestItem"}]}', {status: 200})));

    const store = mockStore();
    await store.dispatch<any>(fetchItems(fetch)());
    const actions = store.getActions();

    expect(actions[0]).toHaveProperty('type', actionTypes.REQUEST_ITEMS);
    expect(actions[1]).toHaveProperty('type', actionTypes.RECEIVE_ITEMS);
  });

  test('calls request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = jest.fn().mockImplementation(() => Promise.resolve(new Response('{"status":400, "statusText": Test Error!}')));

    const store = mockStore();
    await store.dispatch<any>(fetchItems(fetch)());
    const actions = store.getActions();

    expect(actions[0]).toHaveProperty('type', actionTypes.REQUEST_ITEMS);
    expect(actions[1]).toHaveProperty('type', actionTypes.REQUEST_FAILED);
  });
});
