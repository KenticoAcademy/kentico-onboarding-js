import Mock = jest.Mock;
import { Dispatch } from 'redux';
import { List } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { ListItem_GetAll_Error, ListItem_GetAll_Request, ListItem_GetAll_Response } from '../../constants/todoActionTypes';
import { getAllItemsActionCreator, IGetDependencies } from './getAllItemsActionCreator';

describe('GetAllActionCreator', () => {
  const fetchedItems = [{
    id: '1',
    text: 'happy hippo',
    creationTime: '2000-01-01',
    lastModificationTime: '2000-01-01'
  },
    {
      id: '2',
      text: 'hello',
      creationTime: '2019-02-07',
      lastModificationTime: '2019-02-07'
    }];
  const fetchedListItems: List<ListItem> = List([new ListItem({
    id: '1',
    text: 'happy hippo',
    isEdited: false,
    isFetching: false,
  }),
    new ListItem({
      id: '2',
      text: 'hello',
      isEdited: false,
      isFetching: false,
    })]);

  const dispatchMock: Mock<Dispatch> = jest.fn();


  it('retrieves the same items as are provided by the source.', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: () => fetchedItems,
      ok: true,
    }));
    const mockDependency: IGetDependencies = {
      getFromServer: mockResponse,
    };

    await getAllItemsActionCreator(mockDependency)()(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[1][0]).payload.items).toEqual(fetchedListItems);
    expect((dispatchMock.mock.calls[0][0]).type).toBe(ListItem_GetAll_Request);
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_GetAll_Response);
  });

  it('dispatches error when not ok status is returned', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: () => Array<FetchedItem>(),
      ok: false,
    }));
    const mockDependency: IGetDependencies = {
      getFromServer: mockResponse
    };

    await getAllItemsActionCreator(mockDependency)()(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[1][0]).ok).toBeFalsy();
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_GetAll_Error);
  })
});
