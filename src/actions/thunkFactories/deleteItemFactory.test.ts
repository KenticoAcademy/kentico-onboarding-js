import 'isomorphic-fetch';
import {
  AddItemErrorAction,
  DeleteItemSuccessAction,
  SetItemSyncingAction,
} from '../types/itemsActionTypes';
import {
  deleteItemSuccess,
  setItemSyncing,
  addItemError,
} from '../itemsActions';
import { deleteItemFactory } from './deleteItemFactory';
import { GATEWAY_TIMEOUT_MESSAGE } from '../utils/errorMessages';
import { ErrorAction } from '../types/ErrorAction';
import { ItemError } from '../../models/Error';
import { Item } from '../../models/Item';

describe('deleteItemFactory', () => {
  const generateId = () => '42';
  const mockRequest = (isOk: boolean, data: any) =>
    (id: Guid) =>
      isOk
        ? Promise.resolve(new Item({id}))
        : Promise.reject(new Error(data));
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();
  });

  it('when successful, creates deleteItemSuccess action', async () => {
    const id: Guid = '1';
    const expectedAction1: SetItemSyncingAction = setItemSyncing(id, true);
    const expectedAction2: DeleteItemSuccessAction = deleteItemSuccess(id);
    const deleteItemRequest = mockRequest(true, {id, text: 'Text1'});
    const deleteItemAction = deleteItemFactory({ deleteItemRequest, createItemError: jest.fn() });
    const dispatchable = deleteItemAction(id);

    await dispatchable(dispatch, jest.fn(), undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });

  it('when fails, creates displayError action', async () => {
    const id: Guid = '1';
    const error: string = 'There was an error while deleting item: ' + GATEWAY_TIMEOUT_MESSAGE;
    const itemError = new ItemError({
      id: generateId(),
      message: error,
      action: ErrorAction.Delete,
    });
    const expectedAction1: SetItemSyncingAction = setItemSyncing(id, true);
    const expectedAction2: AddItemErrorAction = addItemError(id, itemError);
    const deleteItemRequest = mockRequest(false, GATEWAY_TIMEOUT_MESSAGE);
    const createItemError = jest.fn().mockReturnValue(expectedAction2);
    const deleteItemAction = deleteItemFactory({ deleteItemRequest, createItemError });
    const dispatchable = deleteItemAction(id);

    await dispatchable(dispatch, jest.fn(), undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });
});
