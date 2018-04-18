import { deleteItemFactory } from './deleteItemFactory';
import { SERVER_CONNECTION_PROBLEM } from '../../constants/connection';
import {
  ITEM_DELETION_FAILED,
  ITEM_DELETION_SUCCEEDED,
  TODO_LIST_ITEM_DELETE
} from '../../constants/actionTypes';
import { ListItem } from '../../models/ListItem';
import { FetchStatus } from '../../models/FetchStatus';
import { IAppState } from '../../models/IAppState';
import { OrderedMap } from 'immutable';
import { ListPageState } from '../../enums/listPageState';

const dispatch = jest.fn(input => input);
const id = 'a378ffaa-75fa-4117-a57b-84da0a3c975a';

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('delete item tests', () => {
  it('dispatches TODO_LIST_ITEM_DELETE, ITEM_DELETION_SUCCEEDED after successful DELETE request', async () => {
    const getErrorMessage = jest.fn();
    const axiosDelete = (_id: string) =>
      Promise.resolve({
        data: undefined,
        status: 204,
        statusText: 'No Content',
        headers: undefined,
        config: {}
      });
    const getState = jest.fn();
    const deleteFromServer = deleteItemFactory({
      axiosDelete,
      getErrorMessage
    });
    const deleteItem = {
      type: TODO_LIST_ITEM_DELETE,
      payload: {
        id
      }
    };
    const deletionSucceeded = {
      type: ITEM_DELETION_SUCCEEDED,
      payload: {
        id
      }
    };

    await deleteFromServer(id)(dispatch, getState)
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
        expect(dispatch.mock.calls[1][0]).toEqual(deletionSucceeded);
      })
      .catch(error => fail(new Error(error)));
  });


  it('dispatches TODO_LIST_ITEM_DELETE, ITEM_DELETION_FAILED after unsuccessful DELETE request', async () => {
    const getErrorMessage = jest.fn(() => 'Server connection problem');
    const axiosDelete = (_id: string) =>
      Promise.reject({
        response: {
          data: undefined,
          status: 404,
          statusText: 'Not Found',
          headers: undefined,
          config: {},
        },
      });
    const itemToDelete = {
      id,
      text: 'abc'
    };
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            itemToDelete.id,
            new ListItem(itemToDelete)
          ]
        ])
      },
      error: OrderedMap([]),
      fetchStatus: new FetchStatus(),
      listPageState: ListPageState.Loaded
    };
    const deleteFromServer = deleteItemFactory({
      axiosDelete,
      getErrorMessage
    });
    const deleteItem = {
      type: TODO_LIST_ITEM_DELETE,
      payload: {
        id
      }
    };
    const deletionFailed = {
      type: ITEM_DELETION_FAILED,
      payload: {
        item: new ListItem({
          errorId: null,
          ...itemToDelete,
          isSynchronized: true,
          isEdited: false
        }),
        message: SERVER_CONNECTION_PROBLEM
      }
    };

    await deleteFromServer(id)(dispatch, () => mockStore)
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
        expect(dispatch.mock.calls[1][0]).toEqual(deletionFailed);
      })
      .catch(error => fail(new Error(error)));
  });
})
;
