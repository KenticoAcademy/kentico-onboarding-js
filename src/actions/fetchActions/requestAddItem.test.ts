import { requestAddItemCreator } from './requestAddItem';

import * as ActionType from '../ActionTypes';
import { IAction } from '../IAction';
import { ListItem } from '../../models/ListItem';

describe('requestAddItem', () => {
  it('dispatches fetchingStarts and after response was ok, dispatches fetchingSucceeded with item as its parameter', async () => {

    const text = 'newItemText';

    const createdItem = new ListItem({
      id: '3970a0db-c877-49e1-b4d0-75e931384289',
      text,
      isActive: false,
      creationTime: '1574-12-17 20:30:00',
      lastUpdateTime: '1574-12-17 20:30:00'
    });

    const expected: ReadonlyArray<IAction> = [
      { type: ActionType.FetchAddItemStarted, payload: { text } },
      { type: ActionType.FetchAddItemSucceeded, payload: { ...createdItem } }
    ];

    const fetch = () => Promise.resolve(createdItem);

    const dispatch = jest.fn();

    const requestAddItem = requestAddItemCreator({ addItem: fetch });
    await requestAddItem(text)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and after response was not ok, dispatches fetchingFailed and throw an error', async () => {
    const text = 'newItemText';

    const errorMessage = 'failed';

    const expected: ReadonlyArray<IAction> = [
      { type: ActionType.FetchAddItemStarted, payload: { text } },
      { type: ActionType.FetchAddItemFailed, payload: { errorMessage } }
    ];

    const fetch = () => Promise.reject(new Error(errorMessage));

    const dispatch = jest.fn();

    const requestAddItem = requestAddItemCreator({ addItem: fetch });
    await requestAddItem(text)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });
});
