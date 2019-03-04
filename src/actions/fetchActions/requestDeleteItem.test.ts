import { requestDeleteItemCreator } from './requestDeleteItem';

import * as ActionType from '../ActionTypes';
import { IAction } from '../IAction';

describe('requestDeleteItem', () => {
  it('dispatches fetchingStarts and after response was ok, dispatches fetchingSucceeded with id as its parameter', async () => {
    const id = '3970a0db-c877-49e1-b4d0-75e931384289';

    const expected: ReadonlyArray<IAction> = [
      { type: ActionType.FetchDeleteItemStarted, payload: { id } },
      { type: ActionType.FetchDeleteItemSucceeded, payload: { id } }
    ];

    const fetch = () => Promise.resolve();

    const dispatch = jest.fn();

    const requestDeleteItem = requestDeleteItemCreator({ deleteItem: fetch });
    await requestDeleteItem(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and after response was not ok, dispatches fetchingFailed and throw an error', async () => {
    const id = '3970a0db-c877-49e1-b4d0-75e931384289';

    const errorMessage = 'failed';

    const expected: ReadonlyArray<IAction> = [
      { type: ActionType.FetchDeleteItemStarted, payload: { id } },
      { type: ActionType.FetchDeleteItemFailed, payload: { id, errorMessage } }
    ];

    const fetch = () => Promise.reject(new Error(errorMessage));

    const dispatch = jest.fn();

    const requestDeleteItem = requestDeleteItemCreator({ deleteItem: fetch });
    await requestDeleteItem(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });
});
