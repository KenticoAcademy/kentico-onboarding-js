import { Dispatch } from 'redux';
import {
  ListItem_Delete_Error,
  ListItem_Delete_Request,
  ListItem_Delete_Response
} from '../../constants/todoActionTypes';
import Mock = jest.Mock;
import {
  deleteItemActionCreator,
  IDeleteDependencies
} from './deleteItemActionCreator';

describe('DeleteItemActionCreator', () => {
  const idToDelete = '5';
  const text = 'delete me if you can';
  const itemFromResponse: FetchedItem = {
    id: idToDelete,
    text,
    lastModificationTime: '',
    creationTime: '',
  };
  const dispatchMock: Mock<Dispatch> = jest.fn();


  it('successfully deletes item with same id as defined.', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: () => itemFromResponse,
      ok: true,
    }));
    const mockDependency: IDeleteDependencies = {
      deleteFromServer: mockResponse,
    };

    await deleteItemActionCreator(mockDependency)(idToDelete)(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[0][0]).payload.id).toEqual(idToDelete);
    expect((dispatchMock.mock.calls[1][0]).payload.id).toEqual(idToDelete);
    expect((dispatchMock.mock.calls[0][0]).type).toBe(ListItem_Delete_Request);
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_Delete_Response);
  });

  it('dispatches error when not ok status is returned', async () => {
    jest.clearAllMocks();
    const mockResponse = jest.fn(() => Promise.resolve({
      json: undefined,
      ok: false,
    }));
    const mockDependency: IDeleteDependencies = {
      deleteFromServer: mockResponse
    };

    await deleteItemActionCreator(mockDependency)(idToDelete)(dispatchMock);
    expect(dispatchMock.mock.calls.length).toBe(2);
    expect((dispatchMock.mock.calls[1][0]).ok).toBeFalsy();
    expect((dispatchMock.mock.calls[0][0]).type).toBe(ListItem_Delete_Request);
    expect((dispatchMock.mock.calls[1][0]).type).toBe(ListItem_Delete_Error);
  })
});
