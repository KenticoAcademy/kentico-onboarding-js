import 'isomorphic-fetch';
import { IItem, Item } from '../../models/Item';
import {
  AddItemAction,
  DeleteItemAction,
  DisplayErrorAction, DisplayItemErrorAction,
  LoadingItemsSuccessAction, PostItemSuccessAction, PutItemSuccessAction,
  SaveItemTextAction,
} from '../types/itemsActionTypes';
import {
  getItemsCreator,
  } from './getItemsCreator';
import Mock = jest.Mock;
import {
  deleteItem,
  displayError, displayItemError,
  loadingItemsSuccess, postItemSuccess, putItemSuccess,
  saveItemText,
} from '../itemsActions';
import { addItemCreator } from './addItemCreator';
import { urlBase } from '../utils/urlBase';
import { headerBase } from '../utils/headerBase';
import { postItemCreator } from './postItemCreator';
import { putItemCreator } from './putItemCreator';
import { deleteItemCreator } from './deleteItemCreator';
import { GATEWAY_TIMEOUT_MESSAGE } from '../utils/errorMessages';

describe('fetchCreators', () => {
  const mockResponse = (status: number, statusText?: string, response?: BodyInit) =>
    new Response(response, {
      status,
      statusText,
      headers: headerBase.headers,
    });

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
        new Item({ id: '1', text: 'Text1' }),
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
      const newItem: IItem = new Item({ id: '2', text: 'Text1' });
      const expectedAction1: AddItemAction = addItemCreator(() => tempId)(newItem.text);
      const expectedAction2: PostItemSuccessAction = postItemSuccess(tempId, newItem.id, newItem.text);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'POST',
        body: '{"text":"Text1"}',
      };
      fetchResponse = mockResponse(200, undefined, '{"id":"2","text":"Text1"}');
      dispatch = jest.fn(() => addItemCreator(() => tempId)(newItem.text));

      postItemCreator(fetch, () => tempId)(newItem.text)(dispatch, () => undefined, undefined)
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
      const expectedResult: DisplayItemErrorAction = displayItemError(tempId, error);
      fetchResponse = mockResponse(504, error);
      dispatch = jest.fn(() => addItemCreator(() => tempId)(text));

      postItemCreator(fetch, () => tempId)(text)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedResult);
        });
    });
  });

  describe('putItemCreator', () => {
    it('when successful, creates saveItemText action', () => {
      const updatedItem: IItem = new Item({ id: '1', text: 'Text1' });
      const expectedAction1: SaveItemTextAction = saveItemText(updatedItem.id, updatedItem.text);
      const expectedAction2: PutItemSuccessAction = putItemSuccess(updatedItem.id);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'PUT',
        body: '{"id":"1","text":"Text1"}',
      };
      fetchResponse = mockResponse(200, undefined);

      putItemCreator(fetch)(updatedItem)(dispatch, () => undefined, undefined)
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
      const updatedItem: IItem = new Item({ id: '1', text: 'Text1' });
      const error: string = 'There was an error while saving item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: DisplayItemErrorAction = displayItemError(updatedItem.id, error);
      fetchResponse = mockResponse(504, error);

      putItemCreator(fetch)(updatedItem)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[1][0]).toEqual(expectedResult);
        });
    });
  });

  describe('deleteItemCreator', () => {
    it('when successful, creates deleteItem action', () => {
      const id: Guid = '1';
      const expectedResult: DeleteItemAction = deleteItem(id);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'DELETE',
      };
      fetchResponse = mockResponse(200, undefined, '{"id":"1","text":"Text1"}');

      deleteItemCreator(fetch)(id)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(urlBase + '/' + id);
          expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);

          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });

    it('when fails, creates displayError action', () => {
      const id: Guid = '1';
      const error: string = 'There was an error while deleting item: ' + GATEWAY_TIMEOUT_MESSAGE;
      const expectedResult: DisplayItemErrorAction = displayItemError(id, error);
      fetchResponse = mockResponse(504, error);

      deleteItemCreator(fetch)(id)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });
  });
});


