import 'isomorphic-fetch';
import { IItem, Item } from '../../models/Item';
import {
  AddItemAction,
  DeleteItemAction,
  FetchFailureAction,
  FetchItemsSuccessAction,
  SaveItemTextAction,
} from '../types/itemsActionTypes';
import {
  getItemsCreator,
  } from './getItemsCreator';
import Mock = jest.Mock;
import {
  deleteItem,
  fetchFailure,
  fetchItemsSuccess,
  saveItemText,
} from '../itemsActions';
import { addItemCreator } from './addItemCreator';
import { urlBase } from '../utils/urlBase';
import { headerBase } from '../utils/headerBase';
import { IAppState } from '../../store/state/IAppState';
import { postItemCreator } from './postItemCreator';
import { putItemCreator } from './putItemCreator';
import { deleteItemCreator } from './deleteItemCreator';

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
    it('when successful, creates fetchItemsSuccess action', () => {
      const response: IItem[] = [
        new Item({ id: '1', text: 'Text1' }),
      ];
      const expectedResult: FetchItemsSuccessAction = fetchItemsSuccess(response);
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

    it('when fails, creates fetchFailure action', () => {
      const error = 'Test error';
      const expectedResult: FetchFailureAction = fetchFailure(error);
      fetchResponse = mockResponse(400, error);

      getItemsCreator(fetch)()(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });
  });

  describe('postItemCreator', () => {
    it('when successful, creates addItem action', () => {
      const newItem: IItem = new Item({ id: '1', text: 'Text1' });
      const expectedResult: AddItemAction = addItemCreator(() => newItem.id)(newItem.text);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'POST',
        body: '{"text":"Text1"}',
      };
      fetchResponse = mockResponse(200, undefined, '{"id":"1","text":"Text1"}');

      postItemCreator(fetch, () => '1')(newItem.text)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(urlBase);
          expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);

          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });

    it('when fails, creates fetchFailure action', () => {
      const text: string = 'Item text.';
      const error: string = 'Test error';
      const expectedResult: FetchFailureAction = fetchFailure(error);
      fetchResponse = mockResponse(400, error);

      postItemCreator(fetch, () => '1')(text)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });
  });

  describe('putItemCreator', () => {
    it('when successful, creates saveItemText action', () => {
      const updatedItem: IItem = new Item({ id: '1', text: 'Text1' });
      const expectedResult: SaveItemTextAction = saveItemText(updatedItem.id, updatedItem.text);
      const expectedRequestInit: RequestInit = {
        ...headerBase,
        method: 'PUT',
        body: '{"id":"1","text":"Text1"}',
      };
      const getState: () => IAppState = jest.fn(() => 'Old text');
      fetchResponse = mockResponse(200, undefined);

      putItemCreator(fetch)(updatedItem)(dispatch, getState, undefined)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(urlBase + '/' + updatedItem.id);
          expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);

          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });

    it('when fails, creates fetchFailure action', () => {
      const updatedItem: IItem = new Item({ id: '1', text: 'Text1' });
      const error: string = 'Test error';
      const expectedResult: FetchFailureAction = fetchFailure(error);
      const getState: () => IAppState = jest.fn(() => 'Old text');
      fetchResponse = mockResponse(400, error);

      putItemCreator(fetch)(updatedItem)(dispatch, getState, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
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

    it('when fails, creates fetchFailure action', () => {
      const id: Guid = '1';
      const error: string = 'Test error';
      const expectedResult: FetchFailureAction = fetchFailure(error);
      fetchResponse = mockResponse(400, error);

      deleteItemCreator(fetch)(id)(dispatch, () => undefined, undefined)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch.mock.calls[0][0]).toEqual(expectedResult);
        });
    });
  });
});


