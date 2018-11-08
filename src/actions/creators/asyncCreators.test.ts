import 'isomorphic-fetch';
import {
  AddItemAction,
  AddItemErrorAction,
  DeleteItemSuccessAction,
  DisplayErrorAction,
  LoadingItemsSuccessAction,
  PostItemSuccessAction,
  PutItemSuccessAction,
  SaveItemTextAction,
  SetItemSyncingAction,
} from '../types/itemsActionTypes';
import {
  deleteItemSuccess,
  displayError,
  loadingItemsSuccess,
  postItemSuccess,
  putItemSuccess,
  saveItemText,
  setItemSyncing,
} from '../itemsActions';
import { IItem, Item } from '../../models/Item';
import { getItemsCreator } from './getItemsCreator';
import { addItemCreator } from './addItemCreator';
import { postItemCreator } from './postItemCreator';
import { putItemCreator } from './putItemCreator';
import { deleteItemCreator } from './deleteItemCreator';
import { GATEWAY_TIMEOUT_MESSAGE } from '../utils/errorMessages';
import { addItemErrorCreator } from './addItemErrorCreator';
import Mock = jest.Mock;

describe('fetchCreators', () => {
  const mockResponse = (status: number, statusText?: string, body?: BodyInit) =>
    new Response(body, {
      status,
      statusText,
    });

  const errorIdGenerator = () => '42';
  const addItemError = addItemErrorCreator(errorIdGenerator);
  let response: Response;
  let dispatch: Mock;
  let fetch: Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    fetch = jest.fn().mockImplementation(() => {
        if (!response.ok) {
          return Promise.reject(Error(response.statusText));
        }
        return Promise.resolve(response);
    });
  });

  describe('getItemsCreator', () => {
    it('when successful, creates loadingItemsSuccess action', async () => {
      const fetchedItems: IItem[] = [
        new Item({id: '1', text: 'Text1'}),
      ];
      const expectedResult: LoadingItemsSuccessAction = loadingItemsSuccess(fetchedItems);
      response = mockResponse(200, undefined, '[{"id":"1","text":"Text1"}]');

      await getItemsCreator(fetch)()(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
    });

    it('when fails, creates displayError action', async () => {
      const error = 'There was an error while loading items: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: DisplayErrorAction = displayError(error);
      response = mockResponse(504, GATEWAY_TIMEOUT_MESSAGE);

      await getItemsCreator(fetch)()(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
    });
  });

  describe('postItemCreator', () => {
    it('when successful, creates postItemSuccess action', async () => {
      const tempId: Guid = '1';
      const newItem: IItem = new Item({id: '2', text: 'Text1'});
      const expectedAction1: AddItemAction = addItemCreator(() => tempId)(newItem.text);
      const expectedAction2: PostItemSuccessAction = postItemSuccess(tempId, newItem.id);
      response = mockResponse(200, undefined, '{"id":"2","text":"Text1"}');
      dispatch = jest.fn(() => addItemCreator(() => tempId)(newItem.text));

      await postItemCreator(fetch, addItemCreator(() => tempId), addItemError)(newItem.text)(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
      expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
    });

    it('when fails, creates displayError action', async () => {
      const tempId: Guid = '1';
      const text: string = 'Item text.';
      const error: string = 'There was an error while creating new item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: AddItemErrorAction = addItemError(tempId, error, 'POST');
      response = mockResponse(504, GATEWAY_TIMEOUT_MESSAGE);
      dispatch = jest.fn(() => addItemCreator(() => tempId)(text));

      await postItemCreator(fetch, addItemCreator(() => tempId), addItemError)(text)(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[1][0]).toEqual(expectedResult);
    });
  });

  describe('putItemCreator', () => {
    it('when successful, creates saveItemText action', async () => {
      const updatedItem: IItem = new Item({id: '1', text: 'Text1'});
      const expectedAction1: SaveItemTextAction = saveItemText(updatedItem.id, updatedItem.text);
      const expectedAction2: PutItemSuccessAction = putItemSuccess(updatedItem.id);
      response = mockResponse(200, undefined);

      await putItemCreator(fetch, addItemError)(updatedItem)(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
      expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
    });

    it('when fails, creates displayError action', async () => {
      const updatedItem: IItem = new Item({id: '1', text: 'Text1'});
      const error: string = 'There was an error while saving item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: AddItemErrorAction = addItemError(updatedItem.id, error, 'PUT');
      response = mockResponse(504, GATEWAY_TIMEOUT_MESSAGE);

      await putItemCreator(fetch, addItemError)(updatedItem)(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[1][0]).toEqual(expectedResult);
    });
  });

  describe('deleteItemCreator', () => {
    it('when successful, creates deleteItemSuccess action', async () => {
      const id: Guid = '1';
      const expectedAction1: SetItemSyncingAction = setItemSyncing(id, true);
      const expectedAction2: DeleteItemSuccessAction = deleteItemSuccess(id);
      response = mockResponse(200, undefined, '{"id":"1","text":"Text1"}');

      await deleteItemCreator(fetch, addItemError)(id)(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
      expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
    });

    it('when fails, creates displayError action', async () => {
      const id: Guid = '1';
      const error: string = 'There was an error while deleting item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedAction1: SetItemSyncingAction = setItemSyncing(id, true);
      const expectedAction2: AddItemErrorAction = addItemError(id, error, 'DELETE');
      response = mockResponse(504, GATEWAY_TIMEOUT_MESSAGE);

      await deleteItemCreator(fetch, addItemError)(id)(dispatch, () => undefined, undefined);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
      expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
    });
  });
});


