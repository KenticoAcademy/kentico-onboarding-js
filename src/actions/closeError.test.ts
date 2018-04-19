import { closeError } from './closeError';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { IAppState } from '../models/IAppState';
import { ListPageState } from '../enums/listPageState';
import { Error } from '../models/Error';

const dispatch = jest.fn(input => input);

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('closeError action creator', () => {
  const item = new ListItem({
    id: '9dfe6ae5-adc0-44e1-872c-f38b37e04978',
    text: 'some text',
    isEdited: false,
    isSynchronized: true,
    errorId: '9dfe6ae5-adc0-44e1-872c-f38b37e04978'
  });
  it('should dispatch ITEM_DELETION_SUCCEEDED on ITEM_INSERT_FAILED', () => {
    const action = 'ITEM_INSERT_FAILED';
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            item.id,
            new ListItem(item)
          ]
        ])
      },
      error: OrderedMap([]),
      listPageState: ListPageState.Loaded
    };
    const expectedAction = {
      type: 'ITEM_DELETION_SUCCEEDED',
      payload: {
        id: item.id
      }
    };

    closeError(action, item)(dispatch, () => mockStore);

    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
  });

  it('should dispatch TODO_LIST_ITEM_UPDATE on ITEM_UPDATE_FAILED', () => {
    const action = 'ITEM_UPDATE_FAILED';
    const originalText = 'original text';
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            item.id,
            new ListItem(item)
          ]
        ])
      },
      error: OrderedMap([
        [
          item.errorId,
          new Error({
            id: item.errorId,
            errorMessage: 'errorMessage',
            action,
            item: {
              errorId: null,
              id: item.id,
              text: originalText,
              isEdited: false,
              isSynchronized: true
            }
          })
        ]
      ]),
      listPageState: ListPageState.Loaded
    };
    const expectedAction = {
      type: 'TODO_LIST_ITEM_UPDATE',
      payload: {
        id: item.id,
        text: originalText,
        isSynchronized: true
      }
    };

    closeError(action, item)(dispatch, () => mockStore);

    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
  });

  it('should dispatch ITEM_ERROR_CLOSE on ITEM_UPDATE_FAILED', () => {
    const action = 'ITEM_UPDATE_FAILED';
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            item.id,
            new ListItem(item)
          ]
        ])
      },
      error: OrderedMap([
        [
          item.errorId,
          new Error({
            id: item.errorId,
            errorMessage: 'errorMessage',
            action,
            item
          })
        ]
      ]),
      listPageState: ListPageState.Loaded
    };
    const expectedAction = {
      type: 'ITEM_ERROR_CLOSE',
      payload: {
        id: item.id
      }
    };

    closeError(action, item)(dispatch, () => mockStore);

    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction);
  });

  it('should dispatch ITEM_ERROR_CLOSE on ITEM_DELETION_FAILED', () => {
    const action = 'ITEM_DELETION_FAILED';
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            item.id,
            new ListItem(item)
          ]
        ])
      },
      error: OrderedMap([
        [
          item.errorId,
          new Error({
            id: item.errorId,
            errorMessage: 'errorMessage',
            action,
            item
          })
        ]
      ]),
      listPageState: ListPageState.Loaded
    };
    const expectedAction = {
      type: 'ITEM_ERROR_CLOSE',
      payload: {
        id: item.id
      }
    };

    closeError(action, item)(dispatch, () => mockStore);

    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
  });
});
