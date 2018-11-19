import 'isomorphic-fetch';
import {
  IItem,
  Item,
} from '../../models/Item';
import {
  DisplayErrorAction,
  LoadingItemsSuccessAction,
} from '../types/itemsActionTypes';
import {
  displayError,
  loadingItemsSuccess,
} from '../itemsActions';
import { getItemsFactory } from './getItemsFactory';
import { GATEWAY_TIMEOUT_MESSAGE } from '../utils/errorMessages';

describe('getItemsFactory', () => {
  const mockRequest = (isOk: boolean, data: any) =>
    () =>
      isOk
        ? Promise.resolve(data)
        : Promise.reject(new Error(data));
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();
  });

  it('when successful, creates loadingItemsSuccess action', async () => {
    const fetchedItems: ReadonlyArray<IItem> = [
      new Item({id: '1', text: 'Text1'}),
      new Item({id: '2', text: 'Text2'}),
    ];
    const expectedResult: LoadingItemsSuccessAction = loadingItemsSuccess(fetchedItems);
    const getItemsRequest = mockRequest(true, fetchedItems);
    const getItemsAction = getItemsFactory({ getItemsRequest });
    const dispatchable = getItemsAction();

    await dispatchable(dispatch, jest.fn(), undefined);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
  });

  it('when fails, creates displayError action', async () => {
    const error = 'There was an error while loading items: ' + GATEWAY_TIMEOUT_MESSAGE;
    const expectedResult: DisplayErrorAction = displayError(error);
    const getItemsRequest = mockRequest(false, GATEWAY_TIMEOUT_MESSAGE);
    const getItemsAction = getItemsFactory({ getItemsRequest });
    const dispatchable = getItemsAction();

    await dispatchable(dispatch, jest.fn(), undefined);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
  });
});
