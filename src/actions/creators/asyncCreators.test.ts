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
import { urlBase } from '../utils/urlBase';
import { headerBase } from '../utils/headerBase';
import { postItemCreator } from './postItemCreator';
import { putItemCreator } from './putItemCreator';
import { deleteItemCreator } from './deleteItemCreator';
import { GATEWAY_TIMEOUT_MESSAGE } from '../utils/errorMessages';
import { addItemErrorCreator } from './addItemErrorCreator';
import Mock = jest.Mock;

describe('fetchCreators', () => {
  const mockResponse = (status: number, statusText?: string, response?: BodyInit) =>
    new Response(response, {
      status,
      statusText,
      headers: headerBase.headers,
    });

  const errorIdGenerator = () => '42';
  const addItemError = addItemErrorCreator(errorIdGenerator);
  let fetchResponse: Response;
  let dispatch: Mock;
  let fetch: Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(fetchResponse),
    );
  });

  describe('getItemsCreator', () => {
    it('when successful, creates loadingItemsSuccess action', () => {
      const response: IItem[] = [
        new Item({id: '1', text: 'Text1'}),
      ];
      const expectedResult: LoadingItemsSuccessAction = loadingItemsSuccess(response);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'GET',
      };
      fetchResponse = mockResponse(200, undefined, '[{"id":"1","text":"Text1"}]');

      getItemsCreator(fetch)()(dispatch, () => undefined, undefined)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(urlBase);
          expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);

          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });

    it('when fails, creates displayError action', () => {
      const error = 'There was an error while loading items: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: DisplayErrorAction = displayError(error);
      fetchResponse = mockResponse(504, error);

      getItemsCreator(fetch)()(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });
  });

  describe('postItemCreator', () => {
    it('when successful, creates postItemSuccess action', () => {
      const tempId: Guid = '1';
      const newItem: IItem = new Item({id: '2', text: 'Text1'});
      const expectedAction1: AddItemAction = addItemCreator(() => tempId)(newItem.text);
      const expectedAction2: PostItemSuccessAction = postItemSuccess(tempId, newItem.id);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'POST',
        body: '{"text":"Text1"}',
      };
      fetchResponse = mockResponse(200, undefined, '{"id":"2","text":"Text1"}');
      dispatch = jest.fn(() => addItemCreator(() => tempId)(newItem.text));

      postItemCreator(fetch, addItemCreator(() => tempId), addItemError)(newItem.text)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(urlBase);
          expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);

          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
        });
    });

    it('when fails, creates displayError action', () => {
      const tempId: Guid = '1';
      const text: string = 'Item text.';
      const error: string = 'There was an error while creating new item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: AddItemErrorAction = addItemError(tempId, error, 'POST');
      fetchResponse = mockResponse(504, error);
      dispatch = jest.fn(() => addItemCreator(() => tempId)(text));

      postItemCreator(fetch, addItemCreator(() => tempId), addItemError)(text)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedResult);
        });
    });
  });

  describe('putItemCreator', () => {
    it('when successful, creates saveItemText action', () => {
      const updatedItem: IItem = new Item({id: '1', text: 'Text1'});
      const expectedAction1: SaveItemTextAction = saveItemText(updatedItem.id, updatedItem.text);
      const expectedAction2: PutItemSuccessAction = putItemSuccess(updatedItem.id);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'PUT',
        body: '{"id":"1","text":"Text1"}',
      };
      fetchResponse = mockResponse(200, undefined);

      putItemCreator(fetch, addItemError)(updatedItem)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(urlBase + '/' + updatedItem.id);
          expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);

          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
        });
    });

    it('when fails, creates displayError action', () => {
      const updatedItem: IItem = new Item({id: '1', text: 'Text1'});
      const error: string = 'There was an error while saving item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: AddItemErrorAction = addItemError(updatedItem.id, error, 'PUT');
      fetchResponse = mockResponse(504, error);

      putItemCreator(fetch, addItemError)(updatedItem)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedResult);
        });
    });
  });

  describe('deleteItemCreator', () => {
    it('when successful, creates deleteItemSuccess action', () => {
      const id: Guid = '1';
      const expectedAction1: SetItemSyncingAction = setItemSyncing(id, true);
      const expectedAction2: DeleteItemSuccessAction = deleteItemSuccess(id);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'DELETE',
      };
      fetchResponse = mockResponse(200, undefined, '{"id":"1","text":"Text1"}');

      deleteItemCreator(fetch, addItemError)(id)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(urlBase + '/' + id);
          expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);

          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
        });
    });

    it('when fails, creates displayError action', () => {
      const id: Guid = '1';
      const error: string = 'There was an error while deleting item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedAction1: SetItemSyncingAction = setItemSyncing(id, true);
      const expectedAction2: AddItemErrorAction = addItemError(id, error, 'DELETE');
      fetchResponse = mockResponse(504, error);

      deleteItemCreator(fetch, addItemError)(id)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
        });
    });
  });
});


