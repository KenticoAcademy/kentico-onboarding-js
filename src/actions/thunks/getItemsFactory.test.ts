import { getItemsFactory } from './getItemsFactory';
import { ITEMS_FETCH_FAILED, ITEMS_FETCH_SUCCEEDED, ITEMS_FETCH_STARTED } from '../types/listActionTypes';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { Dispatch } from '../types/Dispatcher';
import Mock = jest.Mock;

describe('Get items', () => {
  const dispatch: Mock<Dispatch> = jest.fn();
  const getItemsSuccessfully = jest.fn(() => Promise.resolve(OrderedMap<Uuid, ListItem>()));
  const getItemsUnsuccessfully = jest.fn(() => Promise.reject(new Error('Invalid response.')));

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('calls request and success actions if the fetch response was successful', async () => {
    const dispatchableGetItems = getItemsFactory({obtainItems: getItemsSuccessfully})();

    await dispatchableGetItems(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_FETCH_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCH_SUCCEEDED);

  });

  it('calls request and fail actions if the fetch response failed', async () => {
    const dispatchableGetItems = getItemsFactory({obtainItems: getItemsUnsuccessfully})();

    await dispatchableGetItems(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_FETCH_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCH_FAILED);
  });
});
