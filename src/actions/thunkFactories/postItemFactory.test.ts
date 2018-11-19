import 'isomorphic-fetch';
import {
  IItem,
  Item,
} from '../../models/Item';
import {
  AddItemAction,
  AddItemErrorAction,
  PostItemSuccessAction,
} from '../types/itemsActionTypes';
import {
  addItem,
  addItemError,
  postItemSuccess,
} from '../itemsActions';
import { postItemFactory } from './postItemFactory';
import { GATEWAY_TIMEOUT_MESSAGE } from '../utils/errorMessages';
import { ItemError } from '../../models/Error';
import { ErrorAction } from '../types/ErrorAction';
import Mock = jest.Mock;

describe('postItemFactory', () => {
  const generateId = () => '42';
  const mockRequest = (isOk: boolean, data: any) =>
    () =>
      isOk
        ? Promise.resolve(new Item(data))
        : Promise.reject(new Error(data));
  let dispatch: Mock;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('when successful, creates postItemSuccess action', async () => {
    const tempId: Guid = '1';
    const newItem: IItem = new Item({id: '2', text: 'Text1'});
    const expectedAction1: AddItemAction = addItem(tempId, newItem.text);
    const expectedAction2: PostItemSuccessAction = postItemSuccess(tempId, newItem.id);
    dispatch = jest.fn(() => addItem(tempId, newItem.text));
    const postItemRequest = mockRequest(true, newItem);
    const postItemAction = postItemFactory({ postItemRequest, generateId: () => tempId, createItemError: jest.fn() });
    const dispatchable = postItemAction(newItem.text);

    await dispatchable(dispatch, jest.fn(), undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });

  it('when fails, creates displayError action', async () => {
    const tempId: Guid = '1';
    const text: string = 'Item text.';
    const error: string = 'There was an error while creating new item: ' + GATEWAY_TIMEOUT_MESSAGE;
    const itemError = new ItemError({
      id: generateId(),
      message: error,
      action: ErrorAction.Add,
    });
    const expectedResult: AddItemErrorAction = addItemError(generateId(), itemError);
    dispatch = jest.fn(() => addItem(tempId, text));
    const postItemRequest = mockRequest(false, GATEWAY_TIMEOUT_MESSAGE);
    const createItemError = jest.fn().mockReturnValue(expectedResult);
    const postItemAction = postItemFactory({ postItemRequest, generateId, createItemError });
    const dispatchable = postItemAction(text);

    await dispatchable(dispatch, jest.fn(), undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedResult);
  });
});
