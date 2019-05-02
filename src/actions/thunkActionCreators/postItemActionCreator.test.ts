import { Dispatch } from 'redux';
import { IPostDependencies, postItemActionCreator } from './postItemActionCreator';
import {
  ListItem_Post_Request, ListItem_Post_Error,
  ListItem_Post_Response
} from '../../constants/todoActionTypes';
import Mock = jest.Mock;

describe ('PostItemActionCreator', () => {
  const dispatchMock: Mock<Dispatch> = jest.fn();
  const text = 'text';
  const id = '2';
  const returnedItem: FetchedItem = {
    id,
    text,
    creationTime: '2019-03-03',
    lastModificationTime: '2019-03-04',
  };

  it('returns from fetch the same item as sent', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: () => returnedItem,
      ok: true,
    }));
    const mockDependency: IPostDependencies = {
      postToServer: mockResponse,
    };
    await postItemActionCreator(mockDependency)(text, () => id)(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[1][0]).payload.item.id).toEqual(id);
    expect((dispatchMock.mock.calls[1][0]).payload.item.text).toEqual(text);
    expect((dispatchMock.mock.calls[0][0]).type).toBe(ListItem_Post_Request);
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_Post_Response);
  });

  it('dispatches error when not ok status is returned', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: () => returnedItem,
      ok: false,
    }));
    const mockDependency: IPostDependencies = {
      postToServer: mockResponse,
    };
    await postItemActionCreator(mockDependency)(text, () => id)(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[1][0]).ok).toBeFalsy();
    expect((dispatchMock.mock.calls[0][0]).type).toBe(ListItem_Post_Request);
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_Post_Error);
  })
});
