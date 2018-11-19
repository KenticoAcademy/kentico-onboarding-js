import 'isomorphic-fetch';
import { OrderedMap } from 'immutable';
import {
  IItem,
  Item,
} from '../../models/Item';
import {
  AddItemErrorAction,
  PutItemSuccessAction,
  SaveItemTextAction,
} from '../types/itemsActionTypes';
import {
  addItemError,
  putItemSuccess,
  saveItemText,
} from '../itemsActions';
import { putItemFactory } from './putItemFactory';
import { GATEWAY_TIMEOUT_MESSAGE } from '../utils/errorMessages';
import { ItemError } from '../../models/Error';
import { ErrorAction } from '../types/ErrorAction';
import Mock = jest.Mock;

describe('putItemFactory', () => {
  const getState: Mock = jest.fn(() => ({
    list: {
      items: OrderedMap([
        [
          '1',
          new Item({
            id: '1',
            text: 'Text1',
          }),
        ],
      ]),
    },
  }));
  const generateId = () => '42';
  const mockRequest = (isOk: boolean, data: any) =>
    () =>
      isOk
        ? Promise.resolve()
        : Promise.reject(new Error(data));
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();
  });

  it('when successful, creates saveItemText action', async () => {
    const updatedItem: IItem = new Item({id: '1', text: 'Text1'});
    const expectedAction1: SaveItemTextAction = saveItemText(updatedItem.id, updatedItem.text);
    const expectedAction2: PutItemSuccessAction = putItemSuccess(updatedItem.id);
    const putItemRequest = mockRequest(true, undefined);
    const putItemAction = putItemFactory({ putItemRequest,  createItemError: jest.fn() });
    const dispatchable = putItemAction(updatedItem.id, updatedItem.text);

    await dispatchable(dispatch, getState, undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });

  it('when fails, creates displayError action', async () => {
    const updatedItem: IItem = new Item({id: '1', text: 'Text1'});
    const error: string = 'There was an error while saving item: ' + GATEWAY_TIMEOUT_MESSAGE;
    const itemError = new ItemError({
      id: generateId(),
      message: error,
      action: ErrorAction.Update,
      oldText: updatedItem.text,
    });
    const expectedAction1: SaveItemTextAction = saveItemText(updatedItem.id, updatedItem.text);
    const expectedAction2: AddItemErrorAction = addItemError(updatedItem.id, itemError);
    const putItemRequest = mockRequest(false, GATEWAY_TIMEOUT_MESSAGE);
    const createItemError = jest.fn().mockReturnValue(expectedAction2);
    const putItemAction = putItemFactory({ putItemRequest, createItemError });
    const dispatchable = putItemAction(updatedItem.id, updatedItem.text);

    await dispatchable(dispatch, getState, undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });
});
