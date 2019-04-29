import { requestEditItemCreator } from './requestEditItem';

import { ListItem } from '../../models/ListItem';
import * as ActionType from '../ActionTypes';
import { IAction } from '../IAction';

describe('requestEditItem', () => {
  it('dispatches fetchingStarts and after response was ok, dispatches fetchingSucceeded with item as its parameter', async () => {
    const id = '3970a0db-c877-49e1-b4d0-75e931384289';

    const item = new ListItem({
      id: '3970a0db-c877-49e1-b4d0-75e931384289',
      text: 'editedText',
      isActive: false,
      creationTime: '1574-12-17 20:30:00',
      lastUpdateTime: '1574-12-17 20:30:00'
    });

    const expected: ReadonlyArray<IAction> = [
      { type: ActionType.FetchEditItemStarted, payload: { id } },
      { type: ActionType.FetchEditItemSucceeded, payload: { ...item } }
    ];

    const fetch = () => Promise.resolve(item);

    const dispatch = jest.fn();

    const requestSaveItem = requestEditItemCreator({ editItem: fetch });
    await requestSaveItem(id, 'editedText')(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);

  });

  it('dispatches fetchingStarts and after response was not ok, dispatches fetchingFailed and throw an error', async () => {
    const id = '3970a0db-c877-49e1-b4d0-75e931384289';

    const errorMessage = 'failed';

    const expected: ReadonlyArray<IAction> = [
      { type: ActionType.FetchEditItemStarted, payload: { id } },
      { type: ActionType.FetchEditItemFailed, payload: { id, errorMessage } }
    ];

    const fetch = () => Promise.reject(new Error(errorMessage));

    const dispatch = jest.fn();

    const requestSaveItem = requestEditItemCreator({ editItem: fetch });
    await requestSaveItem(id, 'editedText')(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
  });

});
