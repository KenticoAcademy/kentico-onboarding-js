import { fetchItems } from './fetchItems';

import { actionTypes } from '../../constants/actionTypes';

describe('CreateFetchItems', () => {
  it('calls request and success action if the fetch response was successful', async () => {
    const fetch = jest.fn();
    const dispatch = jest.fn();

    await fetchItems(fetch)()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toHaveProperty('type', actionTypes.REQUEST_ITEMS);
    expect(dispatch.mock.calls[1][0]).toHaveProperty('type', actionTypes.RECEIVE_ITEMS);
  });

  it('calls request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = jest.fn().mockImplementation(() => Promise.reject(status));

    const dispatch = jest.fn();
    let rejected = '';
    try {
      await fetchItems(fetch)()(dispatch);
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe('Failed to fetch');
  });
});
