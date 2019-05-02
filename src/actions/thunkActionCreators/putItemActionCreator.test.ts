import { Dispatch } from 'redux';
import {
  ListItem_Put_Error,
  ListItem_Put_Response,
  ListItem_Put_Request
} from '../../constants/todoActionTypes';
import Mock = jest.Mock;
import { IPutDependencies, putItemActionCreator } from './putItemActionCreator';


describe ('PutItemActionCreator', () => {
  const dispatchMock: Mock<Dispatch> = jest.fn();
  const newText = 'new text';
  const id = '8';
  const returnedItem: FetchedItem = {
    id,
    text: newText,
    creationTime: '2019-03-03',
    lastModificationTime: '2019-03-04',
  };

  it('returns from fetch the same item as sent', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: () => returnedItem,
      ok: true,
    }));
    const mockDependency: IPutDependencies = {
      putToServer: mockResponse,
    };
    await putItemActionCreator(mockDependency)(id, newText)(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[0][0]).payload.id).toEqual(id);
    expect((dispatchMock.mock.calls[0][0]).payload.text).toEqual(newText);
    expect((dispatchMock.mock.calls[0][0]).type).toBe(ListItem_Put_Request);
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_Put_Response);
  });

  it('dispatches error when not ok status is returned', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: () => undefined,
      ok: false,
    }));
    const mockDependency: IPutDependencies = {
      putToServer: mockResponse,
    };
    await putItemActionCreator(mockDependency)(id, newText)(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[1][0]).ok).toBeFalsy();
    expect((dispatchMock.mock.calls[0][0]).type).toBe(ListItem_Put_Request);
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_Put_Error);
  })
});


