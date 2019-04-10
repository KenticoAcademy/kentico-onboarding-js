import { putItemFactory } from './putItemFactory';
import { ITEM_SAVE_FAILED, ITEM_SAVE_STARTED, ITEM_SAVE_SUCCEEDED } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import Mock = jest.Mock;

describe('Put item', () => {
  const dispatch: Mock<Dispatch> = jest.fn();
  const getState = jest.fn(() => state);
  const itemId = '00000000-0000-0000-0000-000000000001';
  const itemText = 'updated';
  const backupText = 'backup';
  const state = {
    items: OrderedMap<Uuid, ListItem>().set(itemId, new ListItem({id: itemId, text: itemText})),
    backupTexts: OrderedMap<Uuid, string>().set(itemId, backupText),
  };
  const getItemSuccessfully = jest.fn((id: Uuid, text: string) => Promise.resolve({id, text}));
  const getItemUnsuccessfully = jest.fn(() => Promise.reject(new Error('Invalid response.')));

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', async () => {
    const putItem = putItemFactory({updateItem: getItemSuccessfully});
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_SUCCEEDED);
  });

  it('dispatches request and fail actions if the fetch response failed', async () => {
    const putItem = putItemFactory({updateItem: getItemUnsuccessfully});
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_FAILED);
  });
});
