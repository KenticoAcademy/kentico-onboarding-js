import { ITEM_ADD_FAILED, ITEM_ADD_STARTED, ITEM_ADD_SUCCEEDED } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { postItemFactory } from './postItemFactory';
import Mock = jest.Mock;

describe('Post item', () => {
  const dispatch: Mock<Dispatch> = jest.fn();
  const fetchedId = '00000000-0000-0000-0000-000000000002';
  const getItemSuccessfully = jest.fn((text: string) => Promise.resolve({id: fetchedId, text}));
  const getItemUnsuccessfully = jest.fn(() => Promise.reject(new Error('Invalid response.')));

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', async () => {
    const postItem = postItemFactory({createItem: getItemSuccessfully});
    const dispatchable = postItem('text');

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_SUCCEEDED);
  });

  it('dispatches request and fail actions if the fetch response failed', async () => {
    const postItem = postItemFactory({createItem: getItemUnsuccessfully});
    const dispatchable = postItem('text');

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_FAILED);
  });
});
