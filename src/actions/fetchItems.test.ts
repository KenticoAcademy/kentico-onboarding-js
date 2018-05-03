import { fetchItems } from './fetchItems';
import { actionTypes } from '../constants/actionTypes';

describe('fetchItems', () => {
  test('calls request and success action if the fetch response was successful',  async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(new Response('{"body": [{"Id":"1","Text":"TestItem"}]}', {status: 200})));

    const dispatch = jest.fn();
    await fetchItems(window.fetch)(dispatch)();

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toEqual({type: actionTypes.REQUEST_ITEMS});
    expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.RECEIVE_ITEMS);
  });

  test('calls request and failed action if the fetch response was unsuccessful',  async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(new Response('{"status":400, "statusText": Test Error!}')));
    const dispatch = jest.fn();

    await fetchItems(window.fetch)(dispatch)();

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toEqual({type: actionTypes.REQUEST_ITEMS});
    expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.REQUEST_FAILED);
  });
});
